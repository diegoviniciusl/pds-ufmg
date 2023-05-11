import { SELECT_EMPTY_VALUE } from "./constants";
import dateHelper from "./date-helper";
import formHelper from "./form-helper";
import getFormattedPhone from "./get-formatted-phone";
import isValidPhone from "./is-valid-phone";


describe('trial functions tests', () => {

  describe('dateHelper', () => {
    it('returns locale date', () => {
      const date = '2023-01-01';
      const localeDateString = '1/1/2023';
      const toLocaleDateStringSpy = jest.spyOn(Date.prototype, 'toLocaleDateString')
        .mockReturnValue(localeDateString);

      const result = dateHelper.getLocaleDate(date);

      expect(toLocaleDateStringSpy).toHaveBeenCalledWith('pt-BR', { timeZone: 'UTC' });
      expect(result).toBe(localeDateString);

      toLocaleDateStringSpy.mockRestore();
    });

    it('returns locale date with hours', () => {
      const date = '2023-01-01';
      const localeDateStringWithHours = '1/1/2023, 12:00 AM';
      const toLocaleDateStringSpy = jest.spyOn(Date.prototype, 'toLocaleDateString')
        .mockReturnValue(localeDateStringWithHours);

      const result = dateHelper.getLocaleDateWithHours(date);

      expect(toLocaleDateStringSpy).toHaveBeenCalledWith('pt-BR', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'UTC',
      });
      expect(result).toBe(localeDateStringWithHours);

      toLocaleDateStringSpy.mockRestore();
    });
  });


  describe('formHelper', () => {
    describe('setEmptyStringsToNull', () => {
      it('sets empty strings to null', () => {
        const obj = {
          name: 'John Doe',
          age: '',
          email: 'johndoe@example.com',
        };
        const expected = {
          name: 'John Doe',
          age: null,
          email: 'johndoe@example.com',
        };

        const result = formHelper.setEmptyStringsToNull(obj);

        expect(result).toEqual(expected);
      });
    });

    describe('setEmptyStringsToUndefined', () => {
      it('sets empty strings to undefined', () => {
        const obj = {
          name: 'John Doe',
          age: '',
          email: 'johndoe@example.com',
        };
        const expected = {
          name: 'John Doe',
          age: undefined,
          email: 'johndoe@example.com',
        };

        const result = formHelper.setEmptyStringsToUndefined(obj);

        expect(result).toEqual(expected);
      });
    });

    describe('setUndefinedStringsToFalse', () => {
      it('sets undefined strings to false', () => {
        const obj = {
          name: 'John Doe',
          age: undefined,
          email: 'johndoe@example.com',
        };
        const expected = {
          name: 'John Doe',
          age: false,
          email: 'johndoe@example.com',
        };

        const result = formHelper.setUndefinedStringsToFalse(obj);

        expect(result).toEqual(expected);
      });
    });

    describe('setNullToEmptyStrings', () => {
      it('sets null to empty strings', () => {
        const obj = {
          name: 'John Doe',
          age: null,
          email: 'johndoe@example.com',
        };
        const expected = {
          name: 'John Doe',
          age: '',
          email: 'johndoe@example.com',
        };

        const result = formHelper.setNullToEmptyStrings(obj);

        expect(result).toEqual(expected);
      });
    });

    describe('getUndefinedFromEmptyString', () => {
      it('returns undefined from empty string', () => {
        const value = '';

        const result = formHelper.getUndefinedFromEmptyString(value);

        expect(result).toBeUndefined();
      });

      it('returns value for non-empty string', () => {
        const value = 'John Doe';

        const result = formHelper.getUndefinedFromEmptyString(value);

        expect(result).toBe(value);
      });
    });

    describe('getNullFromEmptyString', () => {
      it('returns null from empty string', () => {
        const value = '';

        const result = formHelper.getNullFromEmptyString(value);

        expect(result).toBeNull();
      });

      it('returns value for non-empty string', () => {
        const value = 'John Doe';

        const result = formHelper.getNullFromEmptyString(value);

        expect(result).toBe(value);
      });
    });

    describe('getEmptyStringFromUndefined', () => {
      it('returns empty string from undefined', () => {
        const value = undefined;

        const result = formHelper.getEmptyStringFromUndefined(value);

        expect(result).toBe('');
      });

      it('returns value for defined value', () => {
        const value = 'John Doe';

        const result = formHelper.getEmptyStringFromUndefined(value);

        expect(result).toBe(value);
      });
    });

    describe('getSelectDefaultValue', () => {
      it('returns SELECT_EMPTY_VALUE for empty select records', () => {
        const selectRecords: any[] = [];
        const defaultValue = 'default';

        const result = formHelper.getSelectDefaultValue(selectRecords, defaultValue);

        expect(result).toBe(SELECT_EMPTY_VALUE);
      });

      it('returns defaultValue for non-empty select records', () => {
        const selectRecords = [1, 2, 3];
        const defaultValue = 'default';

        const result = formHelper.getSelectDefaultValue(selectRecords, defaultValue);

        expect(result).toBe(defaultValue);
      });
    });
  });

  describe('getFormattedPhone', () => {
    it('returns formatted phone number for valid numeric phone', () => {
      const phone = '12345678901';
      const expected = '(12) 34567-8901';

      const result = getFormattedPhone(phone);

      expect(result).toBe(expected);
    });

    it('returns empty string for non-numeric phone', () => {
      const phone = 'abcde';
      const expected = '';

      const result = getFormattedPhone(phone);

      expect(result).toBe(expected);
    });

    it('returns empty string for phone with invalid length', () => {
      const phone = '123456789';
      const expected = '';

      const result = getFormattedPhone(phone);

      expect(result).toBe(expected);
    });

    it('returns empty string for empty phone', () => {
      const phone = '';
      const expected = '';

      const result = getFormattedPhone(phone);

      expect(result).toBe(expected);
    });

  });

  describe('isValidPhone', () => {
    it('returns true for valid phone number with full length', () => {
      const phone = '12345678901';
      const result = isValidPhone(phone);
      expect(result).toBe(true);
    });

    it('returns true for valid phone number with reduced length', () => {
      const phone = '1234567890';
      const result = isValidPhone(phone);
      expect(result).toBe(true);
    });

    it('returns false for invalid phone number with excessive length', () => {
      const phone = '123456789012';
      const result = isValidPhone(phone);
      expect(result).toBe(false);
    });

    it('returns false for invalid phone number with insufficient length', () => {
      const phone = '123456789';
      const result = isValidPhone(phone);
      expect(result).toBe(false);
    });

    it('returns false for invalid phone number with non-numeric characters', () => {
      const phone = '1234abcd5678901';
      const result = isValidPhone(phone);
      expect(result).toBe(false);
    });

    it('returns false for empty phone number', () => {
      const phone = '';
      const result = isValidPhone(phone);
      expect(result).toBe(false);
    });
  });
});