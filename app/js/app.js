$(document).ready(function() {
    console.log('ready');

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

    $('#get-skills .btn').click(function() {
        console.log('get-skills');
        $('#get-skills-return').removeClass('display-none');
        $('#get-skills .btn').addClass('display-none');
    });

    $('#technical-btn').click(function() {
        $('#technical-list-return').removeClass('display-none');
        $('#technical-static').removeClass('display-none');
        $('#technical-btn').addClass('display-none');
    });

    var showStepResult = function(step, nextStep) {
        setTimeout(function() {
            $(step.id + ' .blink').addClass('display-none');
            // TODO: animate line by line with 1 sec/line delay?
            $(step.id + '-return').removeClass('display-none');
            // if(nextStep) $(nextStep.id).removeClass('display-none');
        }, DELAY_UNIT);

        setTimeout(function() {
            if(nextStep) $(nextStep.id).removeClass('display-none');
        }, DELAY_RESPONSE);
    };

    var animateCommandText = function(selector, text, delay) {
        var initialDelay = delay * 10;

        setTimeout(function() {
            var i = 0;
            _.each(text, function(c) {
                setTimeout(function() {
                    $(selector).append(c);
                }, delay * i);
                ++i;
            });
        }, initialDelay);
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
            // ++stepIndex;
        }, DELAY_UNIT * currentStep.text.length - 1);
    };

    init();
});