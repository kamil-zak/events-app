import { DocumentBuilder } from '@nestjs/swagger';

const title = 'Events app';
const description = `Events app enables you to create account and create your own events. After you sign up you will be able to get all Events, also other users. You can update or delete only your events.`;
const version = '1.0';

const config = new DocumentBuilder()
  .addBearerAuth()
  .setTitle(title)
  .setDescription(description)
  .setVersion(version)
  .build();

export default config;
