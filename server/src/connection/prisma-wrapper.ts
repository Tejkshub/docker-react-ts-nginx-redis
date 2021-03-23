import { PrismaClient } from '@prisma/client';

class PrismaWrapper {
  private _client?: PrismaClient;

  get client() {
    if (!this._client) {
      throw new Error('Create Prisma client before geting data');
    }

    return this._client;
  }

  create() {
    this._client = new PrismaClient();
  }
}

export const prismaWrapper = new PrismaWrapper();
