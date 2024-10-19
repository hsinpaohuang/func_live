import { describe, expect, it } from 'vitest';
import { $fetchRaw } from 'nitro-test-utils/e2e';
import type { FetchOptions } from 'ofetch';

describe('post bloomCalculator', () => {
  function subject (body: FetchOptions<'json', any>['body'] = undefined) {
    return $fetchRaw('/bloomCalculator', { method: 'POST', body });
  }

  describe('when validating input', () => {
    it('returns error if no body is given', async () => {
      const res = await subject();
      expect(res.status).toBe(400);
      expect(res.data.message).toContain('`input` is invalid');
    });

    it('returns error if invalid input is given', async () => {
      const res = await subject({ input: null });
      expect(res.status).toBe(400);
      expect(res.data.message).toContain('`input` is invalid');
    });
  });

  describe('when validating `n`', () => {
    it('returns error if `n` is not a number', async () => {
      const res = await subject({ input: { n: '123' } });
      expect(res.status).toBe(400);
      expect(res.data.message).toContain('`input.n` must be an integer');
    });

    it('returns error if `n` is not an integer', async () => {
      const res = await subject({ input: { n: 0.123 } });
      expect(res.status).toBe(400);
      expect(res.data.message).toContain('`input.n` must be an integer');
    });

    it('returns error if `n` is less than 1', async () => {
      const res = await subject({ input: { n: 0 } });
      expect(res.status).toBe(400);
      expect(res.data.message).toContain('`input.n` must be greater than 0');
    });
  });

  describe('when validating `p`', () => {
    it('returns error if `p` is not a number', async () => {
      const res = await subject({ input: { n: '123' } });
      expect(res.status).toBe(400);
      expect(res.data.message).toContain('`input.p` must be a number');
    });

    it('returns error if `p` is less than or equal to 0', async () => {
      const res = await subject({ input: { p: 0 } });
      expect(res.status).toBe(400);
      expect(res.data.message).toContain('`input.p` must be greater than 0');
    });

    it('returns error if `n` is greater than 1', async () => {
      const res = await subject({ input: { p: 1.234 } });
      expect(res.status).toBe(400);
      expect(res.data.message).toContain(
        '`input.p` must be less than or equal to 1',
      );
    });
  });
});
