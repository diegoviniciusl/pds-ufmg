import { Trial } from "../../../models";
import { TaskType, TrialStatus } from "../../enums";
import formatTrialNumber from "./format-trial-number";
import getTrialStatusAttributes from "./get-trial-status-attributes";
import getTrialTitle from "./get-trial-title";
import isValidTrialNumber from "./is-valid-trial-number";

describe('trial functions tests', () => {
  describe('isValidTrialNumber', () => {
    it('returns true for valid trial number', () => {
      const trialNumber = 12345678901234567890;
      const result = isValidTrialNumber(trialNumber);
      expect(result).toBe(true);
    });

    it('returns false for invalid trial number', () => {
      const trialNumber = 1234567890;
      const result = isValidTrialNumber(trialNumber);
      expect(result).toBe(false);
    });

    it('returns false for trial number with decimal places', () => {
      const trialNumber = 1234.56;
      const result = isValidTrialNumber(trialNumber);
      expect(result).toBe(false);
    });

    it('returns false for trial number with negative value', () => {
      const trialNumber = -12345678901234567890;
      const result = isValidTrialNumber(trialNumber);
      expect(result).toBe(false);
    });
  });

  describe('formatTrialNumber', () => {
    it('returns formatted trial number with dashes and dots', () => {
      const trialNumber = '12345678901234567890';
      const result = formatTrialNumber(trialNumber);
      expect(result).toBe('1234567-89.0123.4.56.7890');
    });
  });

  describe('getTrialStatusAttributes', () => {
    it('returns attributes for PENDING status', () => {
      const trialStatus = TrialStatus.PENDING;
      const result = getTrialStatusAttributes(trialStatus);
      expect(result).toEqual({
        color: 'bg-yellow-light',
        text: 'Pendente',
      });
    });

    it('returns attributes for IN_PROGRESS status', () => {
      const trialStatus = TrialStatus.IN_PROGRESS;
      const result = getTrialStatusAttributes(trialStatus);
      expect(result).toEqual({
        color: 'bg-gray-100',
        text: 'Em progresso',
      });
    });

    it('returns attributes for TO_CHECK status', () => {
      const trialStatus = TrialStatus.TO_CHECK;
      const result = getTrialStatusAttributes(trialStatus);
      expect(result).toEqual({
        color: 'bg-cyan-light',
        text: 'A conferir',
      });
    });

    it('returns attributes for IN_CONFERENCE status', () => {
      const trialStatus = TrialStatus.IN_CONFERENCE;
      const result = getTrialStatusAttributes(trialStatus);
      expect(result).toEqual({
        color: 'bg-red-lightest',
        text: 'Em conferência',
      });
    });

    it('returns attributes for CHECKED status', () => {
      const trialStatus = TrialStatus.CHECKED;
      const result = getTrialStatusAttributes(trialStatus);
      expect(result).toEqual({
        color: 'bg-purple-light',
        text: 'Conferido',
      });
    });

    it('returns attributes for SENT status', () => {
      const trialStatus = TrialStatus.SENT;
      const result = getTrialStatusAttributes(trialStatus);
      expect(result).toEqual({
        color: 'bg-lime-lightest',
        text: 'Enviado',
      });
    });
  });

  describe('getTrialTitle', () => {
    it('returns trial title with task type label and client name', () => {
      const trial = {
        taskType: TaskType.CALCULATION_ADJUSTMENT_3,
        client: {
          name: 'Client Name',
        },
      };

      const result = getTrialTitle(trial as Trial);

      expect(result).toBe(`Adequação de Cálculo 3º de Client Name`);
    });
  });
})