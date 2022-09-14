namespace API.Persistence
{
    public class MaterialData
    {
        public Guid Id { get; set; }
        public int Stick { get; set; } = 0;
        public int Rock { get; set; } = 0;
        public int RedLeaf { get; set; } = 0;
        public int YellowLeaf { get; set; } = 0;
        public int OrangeLeaf { get; set; } = 0;
        public int WhitePaintStripe { get; set; } = 0;
        public int BlackPaintStripe { get; set; } = 0;
        public int WhitePaintCircle { get; set; } = 0;
        public int BlackPaintCircle { get; set; } = 0;
        public int WhitePaintTriangle { get; set; } = 0;
        public int BlackPaintTriangle { get; set; } = 0;
        public int PineCone { get; set; } = 0;
        public int Feather { get; set; } = 0;
        public int Corn { get; set; } = 0;
        public int Straw { get; set; } = 0;
        public int Bottle { get; set; } = 0;
        public int Pumpkin { get; set; } = 0;
        public int WoodBoard { get; set; } = 0;
        public int Scarf { get; set; } = 0;
        public int Hoodie { get; set; } = 0;
        public int Skull { get; set; } = 0;
        public int Bone { get; set; } = 0;
        public int Candle { get; set; } = 0;
        public int Tire { get; set; } = 0;
        public int Metal { get; set; } = 0;
        public int WitchHat { get; set; } = 0;
        public int Broom { get; set; } = 0;
        public int PitchFork { get; set; } = 0;
        public int Sheet { get; set; } = 0;
        public int PumpkinPie { get; set; } = 0;    
        public int GooglyEyes { get; set; } = 0;  
        public int Rope { get; set; } = 0;
        public int Overalls { get; set; } = 0;
        public int Sword { get; set; } = 0;
        public int Chair { get; set; } = 0;

        public void AddMaterials(MaterialData fromMaterials)
        {
            Stick += fromMaterials.Stick;
            Rock += fromMaterials.Rock;
            RedLeaf += fromMaterials.RedLeaf;
            YellowLeaf += fromMaterials.YellowLeaf;
            OrangeLeaf += fromMaterials.OrangeLeaf;
            WhitePaintStripe += fromMaterials.WhitePaintStripe;
            WhitePaintCircle += fromMaterials.WhitePaintCircle;
            BlackPaintStripe += fromMaterials.BlackPaintStripe;
            BlackPaintCircle += fromMaterials.BlackPaintCircle;
            WhitePaintTriangle += fromMaterials.WhitePaintTriangle;
            BlackPaintTriangle += fromMaterials.BlackPaintTriangle;
            PineCone += fromMaterials.PineCone;
            Feather += fromMaterials.Feather;
            Corn += fromMaterials.Corn;
            Straw += fromMaterials.Straw;
            Bottle += fromMaterials.Bottle;
            Pumpkin += fromMaterials.Pumpkin;
            WoodBoard += fromMaterials.WoodBoard;
            Scarf += fromMaterials.Scarf;
            Hoodie += fromMaterials.Hoodie;
            Skull += fromMaterials.Skull;
            Bone += fromMaterials.Bone;
            Candle += fromMaterials.Candle;
            Tire += fromMaterials.Tire;
            Metal += fromMaterials.Metal;
            WitchHat += fromMaterials.WitchHat;
            Broom += fromMaterials.Broom;
            PitchFork += fromMaterials.PitchFork;
            Sheet += fromMaterials.Sheet;
            PumpkinPie += fromMaterials.PumpkinPie;
            GooglyEyes += fromMaterials.GooglyEyes;
            Rope += fromMaterials.Rope;
            Overalls += fromMaterials.Overalls;
            Sword += fromMaterials.Sword;
            Chair += fromMaterials.Chair;
        }

        public void RemoveMaterials(MaterialData fromMaterials)
        {
            Stick -= fromMaterials.Stick;
            Rock -= fromMaterials.Rock;
            RedLeaf -= fromMaterials.RedLeaf;
            YellowLeaf -= fromMaterials.YellowLeaf;
            OrangeLeaf -= fromMaterials.OrangeLeaf;
            WhitePaintStripe -= fromMaterials.WhitePaintStripe;
            WhitePaintCircle -= fromMaterials.WhitePaintCircle;
            BlackPaintStripe -= fromMaterials.BlackPaintStripe;
            BlackPaintCircle -= fromMaterials.BlackPaintCircle;
            WhitePaintTriangle -= fromMaterials.WhitePaintTriangle;
            BlackPaintTriangle -= fromMaterials.BlackPaintTriangle;
            PineCone -= fromMaterials.PineCone;
            Feather -= fromMaterials.Feather;
            Corn -= fromMaterials.Corn;
            Straw -= fromMaterials.Straw;
            Bottle -= fromMaterials.Bottle;
            Pumpkin -= fromMaterials.Pumpkin;
            WoodBoard -= fromMaterials.WoodBoard;
            Scarf -= fromMaterials.Scarf;
            Hoodie -= fromMaterials.Hoodie;
            Skull -= fromMaterials.Skull;
            Bone -= fromMaterials.Bone;
            Candle -= fromMaterials.Candle;
            Tire -= fromMaterials.Tire;
            Metal -= fromMaterials.Metal;
            WitchHat -= fromMaterials.WitchHat;
            Broom -= fromMaterials.Broom;
            PitchFork -= fromMaterials.PitchFork;
            Sheet -= fromMaterials.Sheet;
            PumpkinPie -= fromMaterials.PumpkinPie;
            GooglyEyes -= fromMaterials.GooglyEyes;
            Rope -= fromMaterials.Rope;
            Overalls -= fromMaterials.Overalls;
            Sword -= fromMaterials.Sword;
            Chair -= fromMaterials.Chair;
        }

        public bool VerifyMaterialRemoval(MaterialData fromMaterials)
        {
            var verify = Stick - fromMaterials.Stick;
            if (verify < 0)
                return false;
            verify = Rock - fromMaterials.Rock;
            if (verify < 0)
                return false;
            verify = RedLeaf - fromMaterials.RedLeaf;
            if (verify < 0)
                return false;
            verify = YellowLeaf - fromMaterials.YellowLeaf;
            if (verify < 0)
                return false;
            verify = OrangeLeaf - fromMaterials.OrangeLeaf;
            if (verify < 0)
                return false;
            verify = WhitePaintStripe - fromMaterials.WhitePaintStripe;
            if (verify < 0)
                return false;
            verify = WhitePaintCircle - fromMaterials.WhitePaintCircle;
            if (verify < 0)
                return false;
            verify = BlackPaintStripe - fromMaterials.BlackPaintStripe;
            if (verify < 0)
                return false;
            verify = BlackPaintCircle - fromMaterials.BlackPaintCircle;
            if (verify < 0)
                return false;
            verify = PineCone - fromMaterials.PineCone;
            if (verify < 0)
                return false;
            verify = Feather - fromMaterials.Feather;
            if (verify < 0)
                return false;
            verify = Corn - fromMaterials.Corn;
            if (verify < 0)
                return false;
            verify = Straw - fromMaterials.Straw;
            if (verify < 0)
                return false;
            verify = Bottle - fromMaterials.Bottle;
            if (verify < 0)
                return false;
            verify = Pumpkin - fromMaterials.Pumpkin;
            if (verify < 0)
                return false;
            verify = WoodBoard - fromMaterials.WoodBoard;
            if (verify < 0)
                return false;
            verify = Scarf - fromMaterials.Scarf;
            if (verify < 0)
                return false;
            verify = Hoodie - fromMaterials.Hoodie;
            if (verify < 0)
                return false;
            verify = Skull - fromMaterials.Skull;
            if (verify < 0)
                return false;
            verify = Bone - fromMaterials.Bone;
            if (verify < 0)
                return false;
            verify = Candle - fromMaterials.Candle;
            if (verify < 0)
                return false;
            verify = Tire - fromMaterials.Tire;
            if (verify < 0)
                return false;
            verify = Metal - fromMaterials.Metal;
            if (verify < 0)
                return false;
            verify = WitchHat - fromMaterials.WitchHat;
            if (verify < 0)
                return false;
            verify = Broom - fromMaterials.Broom;
            if (verify < 0)
                return false;
            verify = PitchFork - fromMaterials.PitchFork;
            if (verify < 0)
                return false;
            verify = Sheet - fromMaterials.Sheet;
            if (verify < 0)
                return false;
            verify = PumpkinPie - fromMaterials.PumpkinPie;
            if (verify < 0)
                return false;
            verify = GooglyEyes - fromMaterials.GooglyEyes;
            if (verify < 0)
                return false;
            verify = Rope - fromMaterials.Rope;
            if (verify < 0)
                return false;

            return true;
        }
    }
}