using API.Persistence;

namespace API.Services
{
    public class MaterialService
    {
        private readonly Random _rand;
        public MaterialService()
        {
            _rand = new Random();
        }

        public MaterialData GenerateMaterialData(int count)
        {
            MaterialData returnData = new MaterialData();
            for (int i = 0; i < count; i++)
            {
                var randomNumber = _rand.Next(100);
                //stick 10% chance
                if (randomNumber > 90)
                    returnData.Stick++;
                //leaves 10% chance
                else if (randomNumber > 87)
                    returnData.RedLeaf++;
                else if (randomNumber > 84)
                    returnData.YellowLeaf++;
                else if (randomNumber > 80)
                    returnData.OrangeLeaf++;
                //paint 10% chance
                else if (randomNumber > 78)
                    returnData.BlackPaintStripe++;
                else if (randomNumber > 76)
                    returnData.BlackPaintCircle++;
                else if (randomNumber > 73)
                    returnData.WhitePaintStripe++;
                else if (randomNumber > 70)
                    returnData.WhitePaintCircle++;
                //wood board 10% chance
                else if (randomNumber > 60)
                    returnData.WoodBoard++;
                //pumpkin 3% chance
                else if (randomNumber > 57)
                    returnData.Pumpkin++;
                //PineCone 5% chance
                else if (randomNumber > 52)
                    returnData.PineCone++;
                //Feather 5% chance
                else if (randomNumber > 47)
                    returnData.Feather++;
                //Corn 5% chance
                else if (randomNumber > 42)
                    returnData.Corn++;
                //Straw 5% chance
                else if (randomNumber > 37)
                    returnData.Straw++;
                //bottle 3% chance
                else if (randomNumber > 34)
                    returnData.Bottle++;
                //scarf 3% chance
                else if (randomNumber > 31)
                    returnData.Scarf++;
                //hoodie 3% chance
                else if (randomNumber > 28)
                    returnData.Hoodie++;
                //skull 2% chance
                else if (randomNumber > 26)
                    returnData.Skull++;
                //bone 2% chance
                else if (randomNumber > 24)
                    returnData.Bone++;
                //candle 2% chance
                else if (randomNumber > 22)
                    returnData.Candle++;
                //tire 2% chance
                else if (randomNumber > 20)
                    returnData.Tire++;
                //metal 2% chance
                else if (randomNumber > 18)
                    returnData.Metal++;
                //witch hat 2% chance
                else if (randomNumber > 16)
                    returnData.WitchHat++;
                //broom 2% chance
                else if (randomNumber > 14)
                    returnData.Broom++;
                //pitch fork 2% chance
                else if (randomNumber > 12)
                    returnData.PitchFork++;
                //sheet 2% chance
                else if (randomNumber > 10)
                    returnData.Sheet++;
                //pumpkin pie 2% chance
                else if (randomNumber > 8)
                    returnData.PumpkinPie++;
                //googly eyes 2% chance
                else if (randomNumber > 6)
                    returnData.GooglyEyes++;
                //rope 2% chance
                else if (randomNumber > 4)
                    returnData.Rope++;
            }

            return returnData;
        }
    }
}