import * as React from 'react';
import { IComponentProps, IManywho } from './interfaces';
import { component } from './utils/wrapper';

declare const manywho: IManywho;

class CustomInput extends React.Component<IComponentProps> {
    state = {
        maxCahracters : 100,
        remainingcount : 100,
    };

    onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.props.onChange(e.target.value);

        const currentText = e.target.value;
        const characterCount = currentText.length;

        this.state.remainingcount = this.state.maxCahracters - characterCount;
        const inputElement: HTMLInputElement = document.getElementById('counter') as HTMLInputElement;

        inputElement.value = this.state.remainingcount.toString();

    }

    render() {
        return (
            /*
            <span>Hello World</span>
            */
            <div>
            <textarea
                placeholder="Enter some text"
                onChange={this.onChange}
                maxLength={100}
                rows={5}
                cols={100}
            />
            <br />
            Max Characters : <input id="counter" value={this.state.remainingcount} />
         </div>
        );
    }
}

manywho.component.register('custom-input', component(CustomInput, true));

export default CustomInput;
