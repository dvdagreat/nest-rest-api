import { Sequelize } from 'sequelize-typescript';
import { ProductImage } from '../products/entities/product-image.model';
import { ProductLike } from '../products/entities/product-like.model';
import { Product } from '../products/entities/product.model';
import { UserRole } from '../user-roles/entities/user-role.model';
import { UserDetails } from '../users/entities/user-detail.model';
import { User } from '../users/entities/user.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        password: 'password',
        username: 'postgres',
        port: 5432,
        database: 'my_store',
      });

      sequelize.addModels([
        User,
        UserDetails,
        UserRole,
        Product,
        ProductLike,
        ProductImage,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
