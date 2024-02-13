export function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
    return formattedDate;
  }
  
  // Example usage:
  const date = new Date();
  console.log(formatDate(date)); // Output: Monday, February 11, 2024
  