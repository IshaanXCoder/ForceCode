using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

using Stack2Deep.Dal.Configuration;

namespace Stack2Deep.Dal;

public class DataContextFactory : IDesignTimeDbContextFactory<DataContext>
{
    public DataContext CreateDbContext(string[] args)
    {
        //var config = DataConfigurationManager.DataConfiguration;
        
        var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
        optionsBuilder.UseNpgsql($"Host=localhost;Username=codeforce;Password=forcecode;Database=data.db");

        return new DataContext(optionsBuilder.Options);
    }
}