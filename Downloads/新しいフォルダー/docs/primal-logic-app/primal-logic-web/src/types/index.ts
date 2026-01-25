/**
 * Shared Types
 */

export interface FoodItem {
    id: string;
    name: string;
    protein?: number;
    fat?: number;
    carbs?: number;
    calories?: number;
    portion?: number;
    unit?: string;
    weight?: number;
    tags?: string[];
    isFavorite?: boolean;
}

export interface DailyLog {
    id: string;
    date: string;
    fuel: FoodItem[];
    status: DailyStatus;
    symptoms: any[];
    bowelMovements: any[];
    calculatedMetrics: CalculatedMetrics;
    diary?: string;
    weight?: number;
    bodyFatPercentage?: number;
    recoveryProtocol?: RecoveryProtocol;
}

export interface DailyStatus {
    energy: number;
    mentalClarity: number;
    digestion: number;
    sleepQuality: number;
    mood: number;
    libido: number;
}

export interface CalculatedMetrics {
    totalCalories: number;
    totalProtein: number;
    totalFat: number;
    totalCarbs: number;
    pfRatio: number;
    omegaRatio: number;
    nutrients: Record<string, number>;
    proteinRequirement?: number;
}

export interface UserProfile {
    name: string;
    gender: 'male' | 'female';
    age: number;
    height: number;
    weight: number;
    activityLevel: 'sedentary' | 'moderate' | 'high';
    dietType: 'lion' | 'carnivore' | 'animal_based';
    language?: string;
    [key: string]: any;
}

export const defaultUserProfile: UserProfile = {
    name: 'Guest',
    gender: 'male',
    age: 30,
    height: 170,
    weight: 70,
    activityLevel: 'moderate',
    dietType: 'carnivore',
};

export interface RecoveryProtocol {
    isActive: boolean;
    stage: string;
    startedAt: string;
    recommendations: string[];
}
