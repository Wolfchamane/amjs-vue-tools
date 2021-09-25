export default {
    name  : 'demo-button',
    props : {
        type : {
            type      : String,
            default   : 'button',
            validator : (value = '') =>
                [ 'button', 'submit', 'cancel', 'reset', 'clear' ].includes(value)
        }
    }
};
