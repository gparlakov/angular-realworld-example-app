import { ListErrorsComponent } from './list-errors.component';
import { UserService } from '../core/services/user.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

describe('ListErrorsComponent', () => {
  it('should instantiate successfully', () => {
    const c = new ListErrorsComponent();
    expect(c).toBeDefined();
  });

  it('when it receives an error it should format it', () => {
    const c = new ListErrorsComponent();
    c.errors = { errors: { 'key an': 'error formatted' } };
    expect(c.errorList).toEqual(['key an error formatted']);
  });

  it('when it receives 2 errors it should format it', () => {
    const c = new ListErrorsComponent();
    c.errors = {
      errors: {
        'key an': 'error formatted',
        second: 'error'
      }
    };
    expect(c.errorList).toEqual(['key an error formatted', 'second error']);
  });

  test('when it receives undefined it should throw', () => {
    const c = new ListErrorsComponent();
    expect(() => (c.errors = undefined)).not.toThrow();
  });
});
