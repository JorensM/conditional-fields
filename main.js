//-- Constants --//

const field_hide_transition_length_s = 0.2;
const fade_in_medium_length_s = 0.4;


const form = document.getElementById('form');
const form_submitted_element = document.getElementById('form-submitted')

const required_inputs = [];

const conditional_fields = new ConditionalFields();



//-- Initialization --//

r.style.setProperty('--field-hide-transition-length', field_hide_transition_length_s + 's');
r.style.setProperty('--fade-in-medium', fade_in_medium_length_s + 's')

conditional_fields.init({
    fadeInAnimation: 13
}, );

// Add event listeners to make form fields conditional and hide the ones that should be hidden
for(let i = 0; i < conditional_elements.length; i++) {
    const field = conditional_elements[i];
    console.log(field);
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

// Add submit listener to form
form.addEventListener('submit', handleSubmit);

//-- Functions --//

/**
 * Hide a field with transition
 * @param {HTMLElement} element field to hide
 */
function hideField(element) {
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
 * Show a field with transition
 * @param {HTMLElement} element field to show 
 */
function showField(element) {
    console.log('showing')
    const input = element.querySelector('input');

    if(required_inputs.includes(input)) {
        input.required = true;
    }

    element.classList.remove('field-hidden');
    setTimeout(() => {
        element.style.paddingBlock = 'var(--field-margin-y)'
        element.style.height = element.scrollHeight + 'px';
    }, 20)
}



/**
 * Hide field if its dependant field is not filled/checked
 * 
 * @param {HTMLElement} element Element to maybe hide
 * @param {HTMLElement} depends_on Element on which the field's hidden state depends.
 * @param {string} required_value (optional) Which value the depended input needs to have in order to display the element
 */
function maybeHideField(element, depends_on, required_value) {
    if(depends_on.getAttribute('type') == 'checkbox') {
        if(depends_on.checked) {
            showField(element)
        } else {
            hideField(element);
            // element.classList.add('field-hidden');
            // element.style.height = '0px';
            // element.style.display = 'none';
        }
    } else if(required_value) {
        if(depends_on.value == required_value) {
            showField(element);
        } else {
            hideField(element);
        }
        
    }
}


//-- Handlers --//

/**
 * On form submission. Hides the form and shows 'Thank you' message
 * @param {SubmitEvent} e event
 */
function handleSubmit(e) {
    e.preventDefault();
    console.log('submitted');
    form.classList.add('fade-out');
    setTimeout(() => {
        form.style.display = 'none';
        form_submitted_element.style.display = null;
    }, fade_in_medium_length_s * 1000)
    
    
    setTimeout(() => {
        form_submitted_element.classList.add('fade-in');
    }, 20)
    
}