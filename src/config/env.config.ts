import { ConfigModuleOptions } from '@nestjs/config';

const envConfig: ConfigModuleOptions = {
  envFilePath: ['.env', '.env.development.local', '.env.development'],
  isGlobal: true,
};

export default envConfig;
