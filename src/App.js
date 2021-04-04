import './App.css';
import { Form } from './Form';
import { FORM_CONFIGURATION } from './form-constants';

function App() {
  return (
    <section role="main" className='app-container'>
      <Form title='One very configurable form' formConfig={ FORM_CONFIGURATION }/>
    </section>
  );
}

export default App;
