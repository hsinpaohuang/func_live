import { z } from 'zod';

function calculate({ n, p }: { n: number, p: number }) {
  const m = Math.ceil(n * Math.log(p) / Math.log(1 / Math.pow(2, Math.log(2))));
  const k = Math.round(Math.log(2) * (m / n));
  return [m, k];
}

const inputSchema = z.object(
  {
    input: z.object(
      {
        n: z // number of items
          .number({ message: 'must be an integer' })
          .int({ message: 'must be an integer' })
          .min(1, { message: 'must be greater than 0' }),
        p: z // false positive rate
          .number({ message: 'must be an integer' })
          .gt(0, { message: 'must be greater than 0' })
          .lte(1, { message: 'must be less than or equal to 1' }),
      },
      { message: 'is invalid' },
    )
  },
  { message: '`input` is invalid' },
);

export default defineEventHandler(async event => {
  const { data, error } = await readValidatedBody(event, inputSchema.safeParse);
  if (error) {
    const message = error.issues.reduce((acc, { path, message: msg }) => {
      const key = path.length ? `\`${path.join('.')}\` ` : '';
      const newMsg = `${key}${msg}`;
      return acc ? acc.concat(', ', newMsg) : newMsg;
    }, '');
    throw createError({ status: 400, message });
  }

  return calculate(data.input);
});
