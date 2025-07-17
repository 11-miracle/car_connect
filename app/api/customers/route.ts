import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { Customer } from '@/types';

export async function POST(request: Request) {
  try {
    const customerData: Customer = await request.json();

    // 验证必要字段
    if (!customerData.name || !customerData.email || !customerData.phone || !customerData.carInterest) {
      return NextResponse.json(
        { error: '所有必填字段都必须填写' },
        { status: 400 }
      );
    }

    // 连接数据库并插入数据
    const [result] = await pool.execute(
      'INSERT INTO customers (name, email, phone, car_interest, message, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
      [
        customerData.name,
        customerData.email,
        customerData.phone,
        customerData.carInterest,
        customerData.message || null
      ]
    );

    return NextResponse.json({
      message: '客户信息保存成功',
      customerId: (result as any).insertId
    }, { status: 201 });
  } catch (error) {
    console.error('保存客户信息失败:', error);
    return NextResponse.json(
      { error: '保存客户信息时发生错误' },
      { status: 500 }
    );
  }
}