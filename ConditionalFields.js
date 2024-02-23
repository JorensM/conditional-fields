/**
 * @typedef { Object } ConditionalFieldsOptions
 * @property { string } [hideElementAnimation] - CSS class that gets added before element is hidden
 * @property { number } [hideElementAnimationDelay] - Delay in MS for when the 'hide' CSS class should be applied.
 * This is so that the hide function knows when to apply `display: none` to the element
 * @property { string } [showElementAnimation] - CSS class that gets added after element is shown.
 * @property { string } displayValue - Which `display` value the `showElement` function should use
 * when showing an element. For example: `block`, `inline`, `flex`.
 */

/**
 * @type { ConditionalFieldsOptions }
 */
const default_options = {
    hideElementAnimation: 'expand',
    hideElementAnimationDelay: 2 * 1000,
    showElementAnimation: 'shrink',
    displayValue: 'flex'
}

class ConditionalFields {

    /**
     * @class
     */

    /**
     * @type { HTMLElement } Root document element 
     */
    root_element;

    /**
     * @type { ConditionalFieldsOptions } Options
     */
    options;

    /**
     * @type { NodeListOf<HTMLElement> }
     */
    conditional_elements;
    
    /**
     *  @param { ConditionalFieldsOptions } options
     */
    constructor(options) {
        this.options = {
            ...default_options,
            ...options
        }
        this.root_element = /** @type { HTMLElement } */ (document.querySelector(':root'));
        this.conditional_elements = document.body.querySelectorAll('[show-if]');

        // Add event listeners to make form fields conditional and hide the ones that should be hidden
        for(let i = 0; i < this.conditional_elements.length; i++) {
            const field = this.conditional_elements[i];
            const input = field.querySelector('input');
            if(input && input.required) {
                required_inputs.push(input);
            }
            const showIf = field.getAttribute('show-if').split('=');
            const required_element_id = showIf[0];
            const required_value = showIf[1];
            const element_to_check = document.getElementById(required_element_id);
            
            maybeHideField(field, element_to_check, required_value);
            element_to_check.addEventListener('change', (e) => {
                maybeHideField(field, e.target, required_value)
            })
        }

    }
}