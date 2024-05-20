/**
 * 小票
 */
 interface ILunchReceipt {
    /**
     * 店名
     */
    shopName: string;
    /**
     * 结账时间
     */
    timestamp: number;
    /**
     * 菜品花费
     */
    meals: Array<{ name: string; cost: number }>;
    /**
     * 服务员名
     */
    waiter: string;
    /**
     * 小费
     */
    tip: number;
  }
  
  /**
   * 顾客
   */
  interface ICustomer {
    /**
     * 姓名
     */
    name: string;
    /**
     * 银行余额
     */
    bankBalance: number;
    /**
     * 下单
     * @param menu 菜单
     * @returns 下单的菜
     */
    order(menu: Record<string, number>): string[];
    /**
     * 支付
     * @param cost 花费
     */
    pay(cost: number): void;
    /**
     * 查询银行余额
     */
    checkBankBalance(): void;
  }
  
  /**
   * 饭店
   */
  interface IRestaurant {
    /**
     * 店名
     */
    name: string;
    /**
     * 菜单
     */
    menu: Record<string, number>;
    /**
     * 服务员
     */
    waiters: Array<{ name: string; tip: number }>;
    /**
     * 上菜
     */
    serveMeals(meals: string[]): ILunchReceipt;
    /**
     * 结账
     */
    check(customer: ICustomer, receipt: ILunchReceipt): void;
  }
  
  class Customer implements ICustomer {
    name: string;
    bankBalance: number;
    constructor(name: string, bankBalance: number) {
      this.name = name;
      this.bankBalance = bankBalance;
    }
    order(menu: Record<string, number>): string[] {
      // 随便点三道菜
      return Object.keys(menu)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    }
    pay(cost: number): void {
      if (this.bankBalance < cost) {
        throw new Error(`Dear ${this.name} you balance is not enough.`);
      }
      this.bankBalance -= cost;
    }
    checkBankBalance(): void {
      console.log(`Dear ${this.name}, your bank card balance is ${this.bankBalance}.`);
    }
  }
  
  class Restaurant implements IRestaurant {
    name: string;
    menu: Record<string, number>;
    waiters: Array<{ name: string; tip: number }>;
    constructor(name: string, menu: Record<string, number>, waiters: Array<{ name: string; tip: number }>) {
      this.name = name;
      this.menu = menu;
      this.waiters = waiters;
    }
    serveMeals(meals: string[]): ILunchReceipt {
      // 随机选一个服务员
      const waiter = this.waiters.slice(-Math.floor(Math.random() * this.waiters.length))[0];
      return {
        shopName: this.name,
        timestamp: Date.now(),
        meals: Object.entries(this.menu)
          .filter(([k]) => meals.includes(k))
          .map(([k, v]) => ({ name: k, cost: v })),
        waiter: waiter.name,
        tip: waiter.tip,
      };
    }
    check(customer: ICustomer, receipt: ILunchReceipt): void {
      customer.checkBankBalance();
      const costSum = receipt.meals.reduce((pre, cur) => pre + cur.cost, receipt.tip);
  
      // 打印账单
      console.log('===================');
      console.log(receipt.shopName);
      console.log(new Date(receipt.timestamp).toISOString());
      console.log('===================');
      console.log('meals:');
      receipt.meals.forEach(meal => console.log(`${meal.name} - ${meal.cost}`));
      console.log('===================');
      console.log(`served by - ${receipt.waiter} -`);
      console.log(`tips: ${receipt.tip}`);
      console.log('===================');
      console.log(`sum: ${costSum}`);
      console.log('===================');
  
      customer.pay(costSum);
  
      customer.checkBankBalance();
    }
  }
  
  // Grand Maison Tokyo
  const grandMaisonTokyo = new Restaurant('Grand Maison Tokyo', {
      'ジロール茸とひもとうがらしのサブレ': 130,
      '山羊乳のバヴァロア': 130,
      'ナスのプレッセ': 240,
      '鹿肉のロティとコンソメ': 500,
      'モンブラン・アマファソン “焼き栗のモンブラン”': 58,
      '雲丹のグラティネ': 78,
  }, [{
      name: 'Oobana Natsuki',
      tip: 8,
  },{
      name: 'Hayami Rinko',
      tip: 15,
  },{
      name: 'Aizawa Kamehito',
      tip: 12,
  },{
      name: 'Kyouno Rikutarou',
      tip: 22,
  },]);
  
  const xiaoming = new Customer('Xiao Ming', 114514);
  
  // 小明到店点菜
  const meals = xiaoming.order(grandMaisonTokyo.menu);
  // 饭店上菜，小明吃，收到小票
  const receipt = grandMaisonTokyo.serveMeals(meals);
  // 小明去结账
  grandMaisonTokyo.check(xiaoming, receipt);