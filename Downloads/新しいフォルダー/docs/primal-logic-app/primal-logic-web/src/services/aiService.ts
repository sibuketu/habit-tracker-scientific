/**
 * AI Service Mock
 */

export const analyzeFoodName = async (name: string) => {
  console.log('Mock analyzing food:', name);
  return {
    name: name,
    type: 'animal',
    nutrients: {
      protein: 20,
      fat: 10,
    }
  };
};

export const generateDailyAdvice = async (log: any) => {
  return "Keep up the good work on your Carnivore journey!";
};
