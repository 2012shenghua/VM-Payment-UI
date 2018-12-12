import dva from 'dva';
import './index.css';
import exp from './models/exp.js'
import createLoading from 'dva-loading';
import main from './main'
import mainModel from './models/main'
import Route from './router'
import {createBrowserHistory as createHistory} from "history"
// 1. Initialize
const app = dva({history:createHistory()});
app.use(createLoading({
}))
// 2. Plugins
// app.use({});

// 3. Model
app.model(exp);
app.model(mainModel);
// 4. Router
app.router(Route);

// 5. Start
// app.model(require('./models/products'));/
app.start('#root');
