import { FormGroup } from "@angular/forms";

export class GenericValidator {
  constructor(private validationMessage: { [key: string]: { [key: string]: string } }) {

  }

  processMessages(container: FormGroup): { [key: string]: string } {
    const messages: { [key: string]: string } = {}

    for (const controlKey in container.controls) {
      if (container.controls.hasOwnProperty(controlKey)) {
        const c = container.controls[controlKey]

        if (c instanceof FormGroup) {
          const childMessages = this.processMessages(c);
          Object.assign(messages, childMessages);
        } else {

          if (this.validationMessage[controlKey]) {
            messages[controlKey] = '';
            if ((c.dirty || c.touched) && c.errors) {
              Object.keys(c.errors).map(messageKey => {
                if (this.validationMessage[controlKey][messageKey])
                  messages[controlKey] += this.validationMessage[controlKey][messageKey] + ''
              });
            }
          }
        }
      }
    }
    return messages;
  }
}
