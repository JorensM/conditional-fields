//-- Constants --//

const field_hide_transition_length_s = 0.2;
const fade_in_medium_length_s = 0.4;

const form = document.getElementById('form');
if(!form) {
    throw new Error('Cannot find form')
}
const form_submitted_element = document.getElementById('form-submitted')

const root_element = /** @type { HTMLElement } */ (document.querySelector(':root'));

/**
 * @type {{[k: string]: ConditionalFieldsOptions}}
 */
const OPTIONS = {
    EXAMPLE1: {
        displayValue: 'flex'
    },
    EXAMPLE2: {
        displayValue: 'flex',
        showElementAnimation: 'slide-from-left',
        hideElementAnimation: 'slide-to-left'
    }
}

let options_to_use = null;

const current_url = window.location.pathname;

if(current_url.endsWith('example1.html')) {
    options_to_use = OPTIONS.EXAMPLE1;
} else if(current_url.endsWith('example2.html')) {
    options_to_use = OPTIONS.EXAMPLE2;
}

//-- Initialization --//

root_element.style.setProperty('--field-hide-transition-length', field_hide_transition_length_s + 's');
root_element.style.setProperty('--fade-in-medium', fade_in_medium_length_s + 's')

const conditional_fields = new ConditionalFields(/** @type {!ConditionalFieldsOptions} */ (options_to_use));

// Add submit listener to form
form.addEventListener('submit', handleSubmit);

//-- Handlers --//

/**
 * On form submission. Hides the form and shows 'Thank you' message
 * @param {SubmitEvent} e event
 */
function handleSubmit(e) {
    if(!form) {
        throw new Error('Cannot find form');
    }
    if(!form_submitted_element) {
        throw new Error('Cannot find form submitted element');
    }
    e.preventDefault();
    console.log('submitted');
    form.classList.add('fade-out');
    setTimeout(() => {
        form.style.display = 'none';
        form_submitted_element.style.display = 'flex';
    }, fade_in_medium_length_s * 1000)
    
    
    setTimeout(() => {
        form_submitted_element.classList.add('fade-in');
    }, 20)
    
}