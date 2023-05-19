using SamokatTask.Data.Interfaces;
using SamokatTask.Data.Models;
using System.Data;

namespace SamokatTask.Data.mocks
{
    public class MockRanks : IRank
    {
        public IEnumerable<Rank> Ranks {
            get {
                return new List<Rank> {
                    new Rank
                    {
                        Id = 1,
                        Img = "",
                        Name = "Иванов Иван Иванович",
                        Level = "Высшее образование"
                    },
                    new Rank
                    {
                        Id = 2,
                        Img = "",
                        Name = "Сидоров Сегрей Сергеевич",
                        Level = "Высшее образование"
                    },
                    new Rank
                    {
                        Id = 3,
                        Img = "",
                        Name = "Хавелев Илья Викторович",
                        Level = "Высшее образование"
                    },
                    new Rank
                    {
                        Id = 4,
                        Img = "",
                        Name = "Даниленко Фёдор Андреевич",
                        Level= "Высшее образование"
                    },
                    new Rank
                    {
                        Id = 5,
                        Img = "",
                        Name = "Базаев Роман Георгиевич",
                        Level= "Высшее образование"
                    }
                };
            }
        }
    }
}
