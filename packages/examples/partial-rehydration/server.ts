import { renderToString } from '@glimmerx/ssr';
import StaticComponent from './src/StaticComponent';

interface ExpressResponse {
  end(str: string): void;
}

export default async function handler(
  _: unknown,
  res: ExpressResponse,
  clientsideBundleLocation: string
): Promise<void> {
  const ssrOutput = await renderToString(StaticComponent, {
    rehydrate: true,
  });

  res.end(`
      <!doctype html>
      <html>
        <head>
          <title>Glimmer Demo</title>
        </head>
        <body>
          <div id="app">${ssrOutput}</div>
          <script src="${clientsideBundleLocation}"></script>
        </body>
      </html>
    `);
}
