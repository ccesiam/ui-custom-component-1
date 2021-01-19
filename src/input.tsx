import * as React from 'react';
import { IComponentProps, IManywho } from './interfaces';
import { component } from './utils/wrapper';

declare const manywho: IManywho;

class CustomInput extends React.Component<IComponentProps> {

    constructor(props: any) {
        super(props);
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);
        this.props.model.maxSize = model.maxSize;
        this.props.model.height = model.height;
        this.props.model.width = model.width;
        this.props.model.id = model.id;

        let value = this.props.getContentValue() as string;

    }

    onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.props.onChange(e.target.value);

        const maxCharacters = this.props.model.maxSize;
        const currentText = e.target.value;
        const characterCount = currentText.length;

        const remainingcount = maxCharacters - characterCount;
        const inputElement: HTMLInputElement = document.getElementById(this.props.model.id) as HTMLInputElement;

        inputElement.value = remainingcount.toString();

        // this.setState({content : e.currentTarget.value});
    }

    onBlur = () => {
       this.props.onEvent();
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
                maxLength={this.props.model.maxSize}
                rows={this.props.model.height}
                cols={this.props.model.width}
                value={this.props.getContentValue<string>()}
            />
            <br />
            Max Characters : <input id={this.props.model.id} value={this.props.model.maxSize} readOnly={true} />
         </div>
        );
    }

}

manywho.component.register('custom-textarea', component(CustomInput, true));
// manywho.component.register('custom-input', component(CustomInput, true));

export default CustomInput;
