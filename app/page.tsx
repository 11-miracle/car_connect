import Image from "next/image";
import CustomerForm from '@/components/CustomerForm';
import { Car } from '@/types';

// 示例汽车数据
const cars: Car[] = [
  {
    id: 1,
    name: '特斯拉',
    model: 'Model 3',
    year: 2023,
    price: 239900,
    image: '/tesla-model3.jpg',
    description: '特斯拉Model 3是一款高性能电动轿车，拥有出色的续航能力和智能驾驶功能。'
  },
  {
    id: 2,
    name: '宝马',
    model: 'iX3',
    year: 2023,
    price: 419900,
    image: '/bmw-ix3.jpg',
    description: '宝马iX3是一款豪华电动SUV，结合了宝马的驾驶乐趣和环保理念。'
  },
  {
    id: 3,
    name: '奔驰',
    model: 'EQE',
    year: 2023,
    price: 528000,
    image: '/mercedes-eqe.jpg',
    description: '奔驰EQE是一款中大型电动轿车，拥有豪华的内饰和先进的科技配置。'
  },
  {
    id: 4,
    name: '奥迪',
    model: 'Q4 e-tron',
    year: 2023,
    price: 356000,
    image: '/audi-q4.jpg',
    description: '奥迪Q4 e-tron是一款紧凑型电动SUV，提供舒适的驾乘体验和实用的空间。'
  }
];

export default function Home() {
  // 提取所有车型用于表单选项
  const carModels = cars.map(car => `${car.name} ${car.model}`);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 页面标题 */}
      <header className="bg-blue-600 text-white py-12 px-4 text-center">
        <h1 className="text-4xl font-bold mb-2">豪华汽车展示</h1>
        <p className="text-xl opacity-90">探索我们的精选车型，填写表单了解更多详情</p>
      </header>

      {/* 汽车展示区 */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">精选车型</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cars.map(car => (
            <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                {/* 实际项目中应替换为真实图片 */}
                <span className="text-5xl text-gray-400">🚗</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{car.name} {car.model}</h3>
                <p className="text-gray-600 mb-2">{car.year}款</p>
                <p className="text-2xl font-bold text-blue-600 mb-4">¥{car.price.toLocaleString()}</p>
                <p className="text-gray-600 text-sm mb-4">{car.description}</p>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300">
                  了解更多
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 客户信息表单区 */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">联系我们</h2>
          <CustomerForm carModels={carModels} />
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-800 text-white py-8 px-4 text-center">
        <p>© 2023 汽车展示平台. 保留所有权利.</p>
      </footer>
    </main>
  );
}
