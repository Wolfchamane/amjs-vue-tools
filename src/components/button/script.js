export default {
    name    : 'demo-button',
    props   : {
        type : {
            type    : String,
            default : 'button'
        }
    },
    methods : {
        /**
         * Handles click event on component
         * @param   {MouseEvent}    e   Event
         * @private
         */
        _onClick(e)
        {
            this.$emit('click', e);
        }
    }
};
