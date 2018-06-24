$(document).ready(function() {
    var DELAY_UNIT = 100;
    // Delay of typing effect
    var DELAY_TYPE = DELAY_UNIT;
    // Delay of response after command is entered (eg. hide cursor)
    var DELAY_RESPONSE = DELAY_UNIT;
    // Delay before result is displayed
    var DELAY_RESULT = DELAY_UNIT * 4;
    // Delay before next step is displayed
    var DELAY_NEXT_STEP = DELAY_UNIT * 15;

    var steps = [
        { id: '#get-skills', text: 'me.GetSkills();' },
        { id: '#people-list', text: 'people.List();' },
        { id: '#technical-list', text: 'technical.List();' },
        { id: '#start-over', text: 'startOver();' }
    ];
    var stepIndex = 0;
    var isTyping = false;

    // https://stackoverflow.com/a/11715670
    var scrollToBottom = function() {
        window.scrollTo(0, document.body.scrollHeight);
    };

    var showStepResult = function(step, nextStep) {
        var chain = this.delay(function() {
            $(step.id + ' .blink').addClass('display-none');
            $(step.id + ' button.pulse').addClass('display-none');
        }, DELAY_RESPONSE);

        chain = chain.delay(function() {
            // TODO: animate line by line with 1 sec/line delay?
            $(step.id + '-return').removeClass('display-none');
        }, DELAY_RESULT);

        chain = chain = chain.delay(scrollToBottom, 0);

        return chain.delay(function() {
            if(nextStep) $(nextStep.id).removeClass('display-none');
        }, DELAY_NEXT_STEP);
    };

    var animateCommandChar = function(selector, text, delay, i, chain) {
        return chain.delay(function() {
            $(selector).append(text.charAt(i));
        }, delay);
    };

    var animateCommandText = function(selector, text, delay, chain) {
        // TODO: DELAY_BEFORE_TYPE
        var initialDelay = delay * 10;
        if(!chain) chain = this;

        chain = chain.delay(function() {}, initialDelay);

        for(var i = 0; i < text.length; ++i) {
            chain = animateCommandChar(selector, text, delay, i, chain);
        }

        return chain;
    };

    var doStep = function() {
        var currentStep = steps[stepIndex];
        isTyping = true;
        var chain = showStepResult(currentStep,
            stepIndex < steps.length - 1 ? steps[stepIndex + 1] : null);
        ++stepIndex;

        if(stepIndex < steps.length) {
            currentStep = steps[stepIndex];
            chain = animateCommandText(currentStep.id + ' .command', currentStep.text, DELAY_TYPE, chain);
            chain = chain.delay(function() {
                isTyping = false;
                var currentStep = steps[stepIndex];
                $(currentStep.id + ' button.pulse').removeClass('display-none');
            }, DELAY_TYPE);
            return chain;
        }
        else if(stepIndex === steps.length) {
            // Last step, restart
            window.location.reload(false);
        }
    };

    $("body").keypress(function(e) {
        // Only proceed if ENTER was pressed
        if(event.which !== 13) return;
        if(isTyping) return;
        if(stepIndex > steps.length - 1) return;
        e.preventDefault();

        doStep();
    });

    $('button.pulse').click(function() {
        doStep();
    });

    var init = function() {
        var currentStep = steps[stepIndex];
        isTyping = true;
        var chain = animateCommandText(currentStep.id + ' .command', currentStep.text, DELAY_TYPE);
        chain.delay(function() {
            isTyping = false;
            var currentStep = steps[stepIndex];
            $(currentStep.id + ' button.pulse').removeClass('display-none');
        }, DELAY_TYPE);
    };

    init();
});