export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const validateMint = (
  mint: string
) => {
  const fetchUrl = 'https://frontend-api.pump.fun/coins/';
  fetch(`${fetchUrl + mint}`, { cache: "no-cache" })
  .then((res) => res.json())
  .then((data) => {
    console.log('Returning fetch data from utils')
    console.log(data)
    return data
  })
}

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const formatTime = (timestamp: number) => {
  const now = new Date().getTime();
  const diff = now - timestamp;
  if (diff < 1000 * 60) return 'just now';
  if (diff < 1000 * 60 * 2) return `${Math.floor(diff / 1000)}s`;
  if (diff < 1000 * 60 * 60) return `${Math.floor(diff / 1000 / 60)}m`;
  if (diff < 1000 * 60 * 60 * 24) return `${Math.floor(diff / 1000 / 60 / 60)}h`;
  if (diff < 1000 * 60 * 60 * 24 * 30) return `${Math.floor(diff / 1000 / 60 / 60 / 24)} days`;
  return `A long time`;
}

export function copyToClipboard(mint, event) {
  navigator.clipboard.writeText(mint.mint).then(() => {
    const pElement = document.createElement('p');
    pElement.textContent = `$${mint.symbol} Copied to clipboard!`;
    pElement.className = 'bg-gray-800 text-white py-2 px-4 rounded shadow-md';
    const mouseY = event.clientY; // Get the y-coordinate of the mouse click
    const mouseX = event.clientX; // Get the x-coordinate of the mouse click
    pElement.style.position = 'absolute';
    pElement.style.top = `${mouseY + 15}px`;
    pElement.style.left = `${mouseX - 10}px`;
    document.body.appendChild(pElement);
    setTimeout(() => {
      pElement.remove();
    }, 1000); // Remove the element after 1 second
  });
}

export function formatSolAmount(inputNumber) {
  let numberString = inputNumber.toString();

  // Determine the length of the number string
  let length = numberString.length;

  if (length === 10) {
      // For a 10-digit number, format as 1.854391038
      let integerPart = numberString.charAt(0);
      let decimalPart = numberString.slice(1);
      return `${integerPart}.${decimalPart}`;
  } else if (length === 9) {
      // For a 9-digit number, format as 0.854391038
      return `0.${numberString}`;
  } else if (length <= 8) {
      // For numbers with 8 or fewer digits, add leading zeros and format as 0.045453859
      let zerosToAdd = 8 - length;
      let formattedDecimal = numberString.padStart(8, '0');
      return `0.${formattedDecimal}`;
  } else {
      // Handle other cases (if necessary)
      return numberString;
  }
}