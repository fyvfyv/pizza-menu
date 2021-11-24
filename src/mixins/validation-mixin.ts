import {Component, Inject, Prop} from 'vue-property-decorator';
import ValidatableField from './validatable-field';
import Vue from 'vue';

export const INPUT_FIELD_REF = 'validatedField';
@Component({})
export default class ValidationMixin extends Vue {
  public touched = false;
  public readonly inputFieldRef = INPUT_FIELD_REF;
  public error = {hasError: false, message: ''};

  @Prop({type: Array, default: (): Validator[] => []})
  public customValidators!: Validator[];

  @Inject({default: null})
  public readonly registerField?: (field: ValidationMixin) => void;

  @Inject({default: null})
  public readonly unregisterField?: (field: ValidationMixin) => void;

  public mounted(): void {
    if (!this.$refs[this.inputFieldRef]) throw new Error('You must add an element with the inputFieldRef ref');
    if (this.registerField) this.registerField(this);
  }

  public beforeDestroy(): void {
    if (this.unregisterField) this.unregisterField(this);
  }

  public reset(): void {
    this.setError(false, '');
    this.touched = false;
  }

  public validateField(): boolean | undefined {
    const field = this.$refs[this.inputFieldRef] as ValidatableField;
    if (!field) return;
    for (const validator of this.customValidators) {
      const error = validator(field.value);
      if (error) {
        this.setError(true, error);
        return false;
      }
    }
    field.checkValidity();
    const hasError = !field.validity.valid;
    const error = hasError ? 'Invalid': '';
    this.setError(hasError, error);
    return !hasError;
  }

  private setError(hasError: boolean, message: string): void {
    const error = {
      hasError: this.touched && hasError,
      message: this.touched ? message : '',
    };
    this.$set(this, 'error', error);
    this.$emit('error', error);
  }
}

export type Validator = (value: string) => string;
