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
                if (randomNumber < 26) {
                    if (randomNumber > 20)
                        returnData.BlackPaintStripe++;
                    else if (randomNumber > 16)
                        returnData.BlackPaintCircle++;
                    else if (randomNumber > 12)
                        returnData.WhitePaintStripe++;
                    else if (randomNumber > 8)
                        returnData.WhitePaintCircle++;
                    else if (randomNumber > 4)
                        returnData.WhitePaintTriangle++;
                    else if (randomNumber > 0)
                        returnData.BlackPaintTriangle++;
                } else {
                    randomNumber = _rand.Next(100);
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
                        returnData.WhitePaintStripe++;
                    else if (randomNumber > 71)
                        returnData.Stick++;
                    //wood board 10% chance
                    else if (randomNumber > 60)
                        returnData.WoodBoard++;
                    //pumpkin 3% chance
                    else if (randomNumber > 57)
                        returnData.Pumpkin++;
                    //PineCone 4% chance
                    else if (randomNumber > 53)
                        returnData.PineCone++;
                    //Feather 4% chance
                    else if (randomNumber > 49)
                        returnData.Feather++;
                    //Corn 4% chance
                    else if (randomNumber > 45)
                        returnData.Corn++;
                    //Straw 4% chance
                    else if (randomNumber > 41)
                        returnData.Straw++;
                    //Rock 4% chance
                    else if (randomNumber > 37)
                        returnData.Rock++;
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
                    //witch hat 1% chance
                    else if (randomNumber > 17)
                        returnData.WitchHat++;
                    //broom 1% chance
                    else if (randomNumber > 16)
                        returnData.Broom++;
                    //pitch fork 1% chance
                    else if (randomNumber > 15)
                        returnData.PitchFork++;
                    //sheet 2% chance
                    else if (randomNumber > 13)
                        returnData.Sheet++;
                    //pumpkin pie 2% chance
                    else if (randomNumber > 11)
                        returnData.PumpkinPie++;
                    //googly eyes 1% chance
                    else if (randomNumber > 10)
                        returnData.GooglyEyes++;
                    //rope 2% chance
                    else if (randomNumber > 8)
                        returnData.Rope++;
                    else if (randomNumber > 7)
                        returnData.Overalls++;
                    else if (randomNumber > 6)
                        returnData.Sword++;
                    else if (randomNumber > 5)
                        returnData.Chair++;
                }                
            }

            return returnData;
        }
    }
}