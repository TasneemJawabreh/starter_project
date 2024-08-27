// js files
import { handleSubmit } from './js/formHandler'
import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'


  export { handleSubmit };
//alert("I EXIST");

/*document.getElementById('urlForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const url = document.getElementById('name').value;
  const response = await fetch('/extract', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
  });

  const data = await response.json();
  document.getElementById('results1').innerText = data.text;
  console.log(data);
});*/

// sass files
