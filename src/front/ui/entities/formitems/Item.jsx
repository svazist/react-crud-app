import { withFormsy } from 'formsy-react';
import React,{Component} from 'react';
import {FormControl, FormGroup, HelpBlock,ControlLabel} from 'react-bootstrap'


class Item extends Component {
    constructor(props) {
        super(props);
    }

    changeValue=(event)=> {
        // setValue() will set the value of the component, which in
        // turn will validate it and the rest of the form
        // Important: Don't skip this step. This pattern is required
        // for Formsy to work.

        this.props.setValue(event.currentTarget.value);
    }

    render() {
        // An error message is returned only if the component is invalid
        const errorMessage = this.props.getErrorMessage();
        const {element} = this.props;
        let Control;

        switch (element){

            case 'Radio':
                Control= (<Radio {...this.props}
                                       value={this.props.getValue() || ''}
                                       onChange={this.changeValue} />);
            break;
            case 'Checkbox':
                Control= (<Checkbox {...this.props}
                                 value={this.props.getValue() || ''}
                                 onChange={this.changeValue} />);
            break

            default:
                Control= (<FormControl {...this.props}
                                            value={this.props.getValue() || ''}
                                            onChange={this.changeValue} />);
                break;

        }

        return (
            <FormGroup controlId={this.props.id} validationState={this.props.isPristine()?null:this.props.isValid()?'success':'error'}>
                <ControlLabel>{this.props.label} {this.props.isRequired() ? '*' : null}</ControlLabel>
                {Control}
                {errorMessage && <HelpBlock>{errorMessage}</HelpBlock>}
            </FormGroup>
        );
    }
}


export default withFormsy(Item);