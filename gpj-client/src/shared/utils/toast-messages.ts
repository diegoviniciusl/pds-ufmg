const UNEXPECTED_ERROR = 'Um erro inesperado ocorreu';
const UNAUTHORIZED_USER = 'Usuário não autenticado';
const NOT_FOUND_USER = 'Usuário não encontrado';
const EMAIL_BELONGS_TO_A_USER = 'Email já está sendo utilizado';
const FOUND_DUPLICATED_TRIAL = 'Foi encontrado um processo com esse número';
const CAN_NOT_DEACTIVATE_OWN_USER = 'Não é possível desativar o próprio usuário logado';
const CAN_NOT_REGRESS_OWN_PERMISSION = 'Não é possível regredir as permissões do próprio usuário logado';
const TAX_NUMBER_BELONGS_TO_A_COMPANY = 'CPF ou CNPJ já cadastrados';
const SUCCESS_DEFAULT = 'Operação realizada com sucesso';
const ERROR_DEFAULT = 'A operação falhou';

const toastMessages = {
  success: {
    DEFAULT: SUCCESS_DEFAULT,
  },
  warn: {
    FOUND_DUPLICATED_TRIAL,
  },
  error: {
    DEFAULT: ERROR_DEFAULT,
    UNEXPECTED_ERROR,
    UNAUTHORIZED_USER,
    NOT_FOUND_USER,
    EMAIL_BELONGS_TO_A_USER,
    CAN_NOT_DEACTIVATE_OWN_USER,
    CAN_NOT_REGRESS_OWN_PERMISSION,
    TAX_NUMBER_BELONGS_TO_A_COMPANY,
  },
};

export default toastMessages;
