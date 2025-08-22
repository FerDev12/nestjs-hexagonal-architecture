import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

export interface ApplicationBootstrapOptions {
  driver: 'in-memory' | 'postgres';
}

@Module({})
export class CoreModule {
  static forRoot(options: ApplicationBootstrapOptions): DynamicModule {
    const imports =
      options.driver === 'in-memory'
        ? []
        : [
            TypeOrmModule.forRoot({
              type: 'postgres',
              host: 'localhost',
              port: 5432,
              username: 'postgres',
              password: 'postgres',
              database: 'nestjs-hex',
              autoLoadEntities: true,
              synchronize: true,
            }),
          ];

    return {
      module: CoreModule,
      imports,
    };
  }
}
