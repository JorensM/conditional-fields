//-- Constants --//

const field_hide_transition_length_s = 0.2;
const fade_in_medium_length_s = 0.4;

const form = document.getElementById('form');
if(!form) {
    throw new Error('Cannot find form')
}
const form_submitted_element = document.getElementById('form-submitted')

const root_element = /** @type { HTMLElement } */ (document.querySelector(':root'));

//-- Initialization --//

root_element.style.setProperty('--field-hide-transition-length', field_hide_transition_length_s + 's');
root_element.style.setProperty('--fade-in-medium', fade_in_medium_length_s + 's')

const conditional_fields = new ConditionalFields({
    displayValue: 'flex'
}, );

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