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
    hideElementAnimation: 'fade-out',
    hideElementAnimationDelay: 2 * 1000,
    showElementAnimation: 'fade-in',
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
     * List of elements that depend on other elements
     */
    conditional_elements;

    /**
     * @type { HTMLElement[] }
     * List of inputs that are required
     */
    required_inputs = [];
    
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
                this.required_inputs.push(input);
            }
            const showIfAttribute = field.getAttribute('show-if');
            if (!showIfAttribute) throw new Error('Cannot find attribute show-if')
            const showIfArr = showIfAttribute.split('=');
            const depended_element_id = showIfArr[0];
            const depended_value = showIfArr[1];
            const element_to_check = /** @type {HTMLInputElement */ (document.getElementById(depended_element_id));
            if(!element_to_check) {
                throw new Error('Cannot find element by ID ' + depended_element_id);
            }
            
            this.maybeHideField(field, element_to_check, depended_value);
            element_to_check.addEventListener('change', (e) => {
                this.maybeHideField(field, /** @type { HTMLInputElement }*/ (e.target), depended_value)
            })
        }

    }

    //-- Methods --//

    /**
     * Hide a field with transition
     * @param {HTMLElement} element field to hide
     */
    hideField(element) {
        console.log('hiding')
        element.style.height = "0px";
        element.style.paddingBlock = "0px";

        const input = element.querySelector('input');

        if (input) input.required = false;
        
        setTimeout(() => {
            element.classList.add('field-hidden');
        }, field_hide_transition_length_s * 1000 + 20)
    }

    /**
     * Hide field if its dependant field is not filled/checked
     * 
     * @param {HTMLElement} element Element to maybe hide
     * @param {HTMLInputElement} depends_on Element on which the field's hidden state depends.
     * @param {string} required_value (optional) Which value the depended input needs to have in order to display the element
     */
    maybeHideField(element, depends_on, required_value) {
        if(depends_on.getAttribute('type') == 'checkbox') {
            if(depends_on.checked) {
                this.showField(element)
            } else {
                this.hideField(element);
                // element.classList.add('field-hidden');
                // element.style.height = '0px';
                // element.style.display = 'none';
            }
        } else if(required_value) {
            if(depends_on.value == required_value) {
                this.showField(element);
            } else {
                this.hideField(element);
            }
            
        }
    }

    /**
     * Show a field with transition
     * @param {HTMLElement} element field to show 
     */
    showField(element) {
        const input = element.querySelector('input');

        if(input && this.required_inputs.includes(input)) {
            input.required = true;
        }

        element.classList.remove('field-hidden');
        setTimeout(() => {
            element.style.paddingBlock = 'var(--field-margin-y)'
            element.style.height = element.scrollHeight + 'px';
        }, 20)
    }
}