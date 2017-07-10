import * as chaiAsPromised from 'chai-as-promised';
import * as sinonChai from 'sinon-chai';
import { expect, use } from 'chai';
import { SinonStub, stub } from 'sinon';
import { handleAsync } from '../src/handle-async';

use(chaiAsPromised);
use(sinonChai);

describe('handleAsync', () => {
  let req: any;
  let res: any;
  let next: SinonStub;

  beforeEach(() => {
    req = {};
    res = {};
    next = stub();
  });

  it('should call next if promise rejected', async () => {
    // Arrange
    const handler = async () => {
      throw 'Nope!';
    };

    // Act
    await expect(handleAsync(handler)(req, res, next)).to.be.fulfilled;

    // Assert
    expect(next).to.have.been.calledWith('Nope!');
  });

  it('should call next when sync error thrown', async () => {
    // Arrange
    const handler = () => {
      throw 'Nope!';
    };

    // Act
    await expect(handleAsync(handler)(req, res, next)).to.be.fulfilled;

    // Assert
    expect(next).to.have.been.calledWith('Nope!');
  });

  it('should not call next when handler succeeds', async () => {
    // Arrange
    const handler = () => {
      // Blank
    };

    // Act
    await expect(handleAsync(handler)(req, res, next)).to.be.fulfilled;

    // Assert
    expect(next).not.to.have.been.called;
  });
});
