import React from 'react'; 
import { CardVariant } from '@/types/profile-card';  

type CardVariantSelectorProps = {   
  cardVariant: CardVariant;   
  onChangeVariant: (variant: CardVariant) => void; 
};  

const CARD_VARIANTS: CardVariant[] = ['default', 'funny', 'professional', 'minimalist' ,'linkedin'];  

const CardVariantSelector: React.FC<CardVariantSelectorProps> = ({   
  cardVariant,   
  onChangeVariant, 
}) => {   
  return (     
    <div className="w-full flex justify-end mb-2">
      <select         
        value={cardVariant}         
        onChange={(e) => onChangeVariant(e.target.value as CardVariant)}         
        className="p-2 rounded-md bg-white border border-gray-300 shadow-sm"
      >         
        {CARD_VARIANTS.map((variant) => (           
          <option key={variant} value={variant}>             
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </option>         
        ))}       
      </select>     
    </div>   
  ); 
};  

export default CardVariantSelector;