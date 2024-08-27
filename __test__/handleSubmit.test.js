// Import the js file to test
import { handleSubmit } from "../src/client/js/formHandler";

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: "Server responserrr" }),
  })
);

describe("Testing the submit functionality", () => {
  // Set up the DOM before each test
  beforeEach(() => {
    // Create a form and input elements for testing
    document.body.innerHTML = `
      <form id="urlForm">
        <input id="name" type="text" value="https://example.com" />
      </form>
    `;

    // Clear previous mock calls before each test
    fetch.mockClear();
  });
  afterEach(() => {
   
    jest.clearAllMocks();
});

  test("should be defined", () => {
    // Check if the handleSubmit function is defined
    expect(handleSubmit).toBeDefined();
  });

  test('should call fetch with the correct URL and method when a valid URL is provided', async () => {
    const serverURL = 'https://localhost:8000/api';
    const formText = 'https://example.com';
    const expectedBody = JSON.stringify({ url: formText });

    // Call the function (You might need to adjust the arguments passed to handleSubmit based on your implementation)
    await handleSubmit({ preventDefault: () => {} }, formText, serverURL);

    // Assert that fetch was called with the correct arguments
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(serverURL, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: expectedBody,
    });


    expect(console.log).toHaveBeenCalledWith('Server response:', { message: 'Mocked fetch response' });
});

  test("should not call fetch when an invalid URL is provided", () => {
    // Update the input to an invalid URL
    document.getElementById('name').value = 'invalid-url';
    const event = { preventDefault: jest.fn() };

    // Call the function
    handleSubmit(event);

    // Check that fetch is not called
    expect(fetch).not.toHaveBeenCalled();
  });
});
