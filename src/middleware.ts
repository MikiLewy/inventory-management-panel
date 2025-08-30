import { chain } from '../middlewares/chain';
import { withAuthMiddleware } from '../middlewares/with-auth';
import { withInternationalizationMiddleware } from '../middlewares/with-internationalization';

export default chain([withAuthMiddleware, withInternationalizationMiddleware]);

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)'],
};
