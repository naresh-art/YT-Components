//Class Declaration
public class WelcomeClass {
    Integer a=10;
    Boolean b=false;
    String sName='Welcome';
    Public void demoMethod(){
        sName='Welcome to String';
        System.debug('I am in Method');
        System.debug('a Value::'+a);
        System.debug('b value::'+b);
        System.debug('sName value::'+sName);
    }
    
    Public void demoMethod1(){
        a=20;
        b=true;
        String sName='Welcome to Dev';
        Integer c=50;
         System.debug('I am in second Method');
        System.debug('a Value::'+a);
        System.debug('b value::'+b);
        System.debug('C value::'+c);
        System.debug('sName value::'+sName);
    }
    //sObject Examples
    Public void demoMethod2(){
        Account acc = new Account();
        acc.Name='Naresh';
        acc.Phone='9652380588';
        System.debug('Account Data::'+acc);
    }
    Public void demoMethod3(){
        sObject obj = new Account(Name='Naresh',Phone='9652380588');
        Account acc = (Account)obj;
        System.debug('Account Data::'+acc);
    }
    //List Example
    Public void demoMethod4(){
        List<String> names = new List<String>();
        names.add('John');
        names.add('Alice');
        names.add('Bob');
        names.add('Bob');
        System.debug(names); 
        System.debug('All Names::'+names); 
        System.debug('Second Name::'+names.get(1)); 
        names.add(1,'James');
        System.debug('one Name::'+names.get(1));
        System.debug('Third Name::'+names.get(3)); 
		System.debug('Zero Name::'+names.get(0)); 
    }
    Public void demoMethod5(){
        List<Account> accList = [Select Id, Name from Account Limit 5];
        //List<Account> accList = new List<Account>();
        //accList = [Select Id, Name from Account Limit 5];
        System.debug('Account List Data::'+accList);
        System.debug('stringList Data::'+accList.get(1));
    }
    //Set Example:
    Public void demoMethod6(){
       	Set<String> colors = new Set<String>();
        //colors.add('Red');
        //colors.add('Blue');
        //colors.add('Green');
        //colors.add('Red'); // Adding duplicate element
        colors.add('&');
        colors.add('$');
        colors.add('#');
        colors.add('#');
        colors.add('@'); // Adding duplicate element
        System.debug(colors); 
    }
    Public void demoMethod7(){
        Set<Integer> setNumbers = new Set<Integer>();
        setNumbers.add(10);
        setNumbers.add(20);
        setNumbers.add(30);
        setNumbers.add(20); // Adding duplicate element
        System.debug(setNumbers); 
    }
    //Map example
    Public void demoMethod8(){
        Map<String, String> mapData = new Map<String, String>();
        mapData.put('Naresh', 'Teacher');
        mapData.put('Mohit', 'Cricket');
        mapData.put('Gopal', 'Developer');
        System.debug('map Data::'+mapData);
        System.debug(mapData.get('Naresh')); 
        System.debug(mapData.get('Gopal'));
    }
    Public void demoMethod9(){
        Map<String, Integer> ages = new Map<String, Integer>();
        ages.put('John', 30);
        ages.put('Alice', 25);
        ages.put('Bob', 35);
        ages.put('Bob', 40);
        System.debug(ages.get('John')); 
        System.debug(ages.get('Bob'));
    }
}