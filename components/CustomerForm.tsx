'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Customer } from '@/types';

const customerSchema = z.object({
  name: z.string().min(2, '姓名至少2个字符'),
  email: z.string().email('请输入有效的邮箱'),
  phone: z.string().regex(/^1[3-9]\d{9}$/, '请输入有效的手机号'),
  carInterest: z.string().min(1, '请选择感兴趣的车型'),
  message: z.string().optional()
});

type CustomerFormData = z.infer<typeof customerSchema>;

interface CustomerFormProps {
  carModels: string[];
}

export default function CustomerForm({ carModels }: CustomerFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema)
  });

  const onSubmit = async (data: CustomerFormData) => {
    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('信息提交成功！我们会尽快与您联系。');
        // 重置表单
        (document.getElementById('customer-form') as HTMLFormElement)?.reset();
      } else {
        alert('提交失败，请稍后再试。');
      }
    } catch (error) {
      console.error('提交错误:', error);
      alert('提交时发生错误，请稍后再试。');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">客户信息登记</h2>
      <form id="customer-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
          <input
            type="text"
            {...register('name')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
          <input
            type="email"
            {...register('email')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">电话</label>
          <input
            type="tel"
            {...register('phone')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">感兴趣的车型</label>
          <select
            {...register('carInterest')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">请选择车型</option>
            {carModels.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
          {errors.carInterest && <p className="mt-1 text-sm text-red-600">{errors.carInterest.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">留言</label>
          <textarea
            {...register('message')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入您的需求或问题..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          提交信息
        </button>
      </form>
    </div>
  );
}