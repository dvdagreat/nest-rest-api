import { Inject, Injectable } from '@nestjs/common';
import { Op, Optional, Sequelize, Transaction } from 'sequelize';
import { IUserAccountCreateFields, User } from './entities/user.model';
import {
  IUserDetailsCreateFields,
  UserDetails,
} from './entities/user-detail.model';

@Injectable()
export class UserRepository {
  constructor(@Inject('SEQUELIZE') private sequelize: Sequelize) {}

  private createUserAccount = async (
    user: IUserAccountCreateFields,
    t?: Transaction,
  ): Promise<User> => {
    return (await User.create(user, { transaction: t, raw: true })).save();
  };

  private createUserDetails = async (
    details: IUserDetailsCreateFields,
    t?: Transaction,
  ): Promise<UserDetails> => {
    return (
      await UserDetails.create(details, { transaction: t, raw: true })
    ).save();
  };

  public create = async (
    user: IUserAccountCreateFields,
    details: Optional<IUserDetailsCreateFields, 'user_id'>,
  ): Promise<{ data: { userAccount: User; userDetails: UserDetails } }> => {
    return this.executeTransaction(this.createUserTransaction(user, details));
  };

  private createUserTransaction = (
    user: IUserAccountCreateFields,
    details: Optional<IUserDetailsCreateFields, 'user_id'>,
  ) => {
    return async (t: Transaction) => {
      const userAccount = await this.createUserAccount(user, t);
      const userDetails = await this.createUserDetails(
        { ...details, user_id: userAccount.id },
        t,
      );

      return { data: { userAccount, userDetails } };
    };
  };

  private executeTransaction = async (
    callback: (t: Transaction) => Promise<any>,
  ) => {
    return await this.sequelize.transaction(callback);
  };

  public findOneByUsername = async (username: string): Promise<User> => {
    const user = await User.findOne({ where: { username }, raw: true });
    return user;
  };

  public isUserRegistered = async (
    username: string,
    email: string,
  ): Promise<User> => {
    return await User.findOne({
      where: { [Op.or]: [{ username }, { email }] },
      raw: true,
    });
  };
}
