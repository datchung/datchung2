$(document).ready(function() {
    var DELAY_UNIT = 100;
    var DELAY_RESULT = DELAY_UNIT;
    var DELAY_RESPONSE = DELAY_UNIT;

    var steps = [
        { id: '#get-skills', text: 'me.GetSkills();' },
        { id: '#technical-list', text: 'technical.List();' },
        { id: '#people-list', text: 'people.List();' },
        { id: '#start-over', text: 'startOver();' }
    ];
    var stepIndex = 0;
    var isTyping = false;

    var showStepResult = function(step, nextStep) {
        var chain = this.delay(function() {
            $(step.id + ' .blink').addClass('display-none');
            // TODO: animate line by line with 1 sec/line delay?
            $(step.id + '-return').removeClass('display-none');
            // if(nextStep) $(nextStep.id).removeClass('display-none');
        }, DELAY_UNIT);

        return chain.delay(function() {
            if(nextStep) $(nextStep.id).removeClass('display-none');
        }, DELAY_RESPONSE);
    };

    var animateCommandText = function(selector, text, delay) {
        var initialDelay = delay * 10;

        var chain = this.delay(function() {
            _.each(text, function(c) {
                chain = chain.delay(function() {
                    $(selector).append(c);
                }, delay);
            });
        }, initialDelay);

        // return chain;
    };

    $("body").keypress(function(e) {
        // Only proceed if ENTER was pressed
        if(event.which !== 13) return;
        if(isTyping) return;
        if(stepIndex > steps.length - 1) return;
        e.preventDefault();
        // runCurrentStep();

        var currentStep = steps[stepIndex];
        isTyping = true;
        showStepResult(currentStep,
            stepIndex < steps.length - 1 ? steps[stepIndex + 1] : null,
            DELAY_RESPONSE);
        ++stepIndex;

        if(stepIndex < steps.length) {
            currentStep = steps[stepIndex];
            animateCommandText(currentStep.id + ' .command', currentStep.text, DELAY_UNIT);
            setTimeout(function() {
                isTyping = false;
            }, DELAY_UNIT * currentStep.text.length - 1);
        }
        else if(stepIndex === steps.length) {
            // Last step, restart
            window.location.reload(false);
        }
    });

    var init = function() {
        // runCurrentStep(true);

        var currentStep = steps[stepIndex];
        isTyping = true;
        animateCommandText(currentStep.id + ' .command', currentStep.text, DELAY_UNIT);
        setTimeout(function() {
            isTyping = false;
            var currentStep = steps[stepIndex];
            // $(currentStep.id + ' button.blink').removeClass('display-none');
        }, DELAY_UNIT * currentStep.text.length - 1);
    };

    init();
});