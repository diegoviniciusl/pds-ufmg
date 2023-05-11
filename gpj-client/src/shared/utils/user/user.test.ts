import { UserSession } from "../../../interfaces"
import { Role } from "../../enums"
import getUserRoleText from "./get-user-role-text"
import getUserSessionFromLocalStorage from "./get-user-session-from-local-storage"
import {faker} from '@faker-js/faker'
import isValidPassword from "./is-valid-password"

describe('user util functions', () => {
  describe('getUserRoleText', () => {
    it('should return Administrador when role is ADMIN', () => {
      expect(getUserRoleText(Role.ADMIN)).toBe('Administrador')
    })

    it('should return Funcionário when role is USER', () => {
      expect(getUserRoleText(Role.USER)).toBe('Funcionário')
    })
  })

  describe('getUserSessionFromLocalStorage', () => {
    const localStorageSpy = jest.spyOn(Storage.prototype, 'getItem');

    it('should return null when there is no ', () => {
      localStorageSpy.mockReturnValueOnce(null);

      const userSession = getUserSessionFromLocalStorage()

      expect(userSession).toBeNull()
    })

    it('should return user session', () => {
      const userSession: UserSession = {
        accessToken: 'access-token',
        user: {
          active: true,
          email: faker.internet.email(),
          name: faker.person.fullName(),
          phone: faker.phone.number(),
          role: Role.USER,
          userId: faker.number.int()
        }
      }
      localStorageSpy.mockReturnValueOnce(JSON.stringify(userSession));

      const returnedUserSession = getUserSessionFromLocalStorage()

      expect(returnedUserSession).toStrictEqual(userSession)
    })

    describe('isValidPassword', () => {
      it('should return true when password is larger than 8 characters', () => {
        const password = faker.string.alphanumeric(9)
        expect(isValidPassword(password)).toBeTruthy()
      })

      it('should return true when password is 8 characters', () => {
        const password = faker.string.alphanumeric(8)
        expect(isValidPassword(password)).toBeTruthy()
      })

      it('should return true when password is larger than 7 characters', () => {
        const password = faker.string.alphanumeric(7)
        expect(isValidPassword(password)).toBeFalsy()
      })
    })
  })
})