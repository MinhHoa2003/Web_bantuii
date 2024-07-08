import React from 'react';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar} from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { getAllOrder, getAllOrderDetail, getAllProducts, getAllUser } from '../../utils/ApiFunction';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [orders, setOrders] = useState(0);
  const [products, setProducts] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const calculateOrders = (orders) => {
    const approved = orders.filter(order => (order.status !== 'pending' && order.status !== 'cancelling')).length;
    const pending = orders.filter(order => order.status === 'pending').length;
    return {
      totalMoney: orders.reduce((total, order) => {
        // Chỉ tính tổng cho các đơn hàng có trạng thái là "processing"
        if (order.status !== "pending" && order.status !== 'cancelled') {
          return total + order.totalMoney;
        }
        return total;
      }, 0),
      approved: approved,
      pending: pending,
      length: orders.length
    }
  }
  function getUsersWithRoleUser(users) {
    return users.filter(user => 
        user.roles.some(role => role.value === "ROLE_USER")
    );
  }
  useEffect(() => {
    const fetchApi = async () => {
      await getAllOrder().then((res) => {
        const results = calculateOrders(res);
        setOrders(results);
        setRevenue(results.totalMoney);
      });
      let product = {
        length: "",
        quantity: ""
      };
      await getAllProducts().then((res) => {
        product.length = res.length;
      });
      await getAllOrderDetail().then((res) => {
        product.quantity = res.reduce((sum, orderDetail) => sum + orderDetail.numberOfProducts, 0)
      });
      setProducts(product);
      getAllUser().then((res) => {
        const results = getUsersWithRoleUser(res);
        setCustomers(results.length);
      });
    }
    fetchApi();
  }, []);

  return (
    <Space size={20} direction="vertical" style={{ width: '100%' }}>
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Row gutter={[20, 20]} justify="space-between">
        <Col xs={24} sm={12} md={6}>
          <DashboardCard
            icon={
              <ShoppingCartOutlined
                style={{
                  color: "green",
                  backgroundColor: "rgba(0,255,0,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
/>
            }
            title={"Đơn hàng"}
            value={orders.length}
            approvedOrders={orders.approved}
            pendingOrders={orders.pending}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <DashboardCard
            icon={
              <ShoppingOutlined
                style={{
                  color: "blue",
                  backgroundColor: "rgba(0,0,255,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Số lượng mặt hàng"}
            value={products.length}
            quantityProducts={products.quantity}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <DashboardCard
            icon={
              <UserOutlined
                style={{
                  color: "purple",
                  backgroundColor: "rgba(0,255,255,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Khách hàng"}
            value={customers}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <DashboardCard
            icon={
              <DollarCircleOutlined
                style={{
                  color: "red",
                  backgroundColor: "rgba(255,0,0,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Doanh thu"}
            value={`${revenue}$`}
          />
        </Col>
      </Row>
      <Row gutter={[20, 20]}>
        <Col xs={24} sm={12}>
          <RecentOrders />
        </Col>
        <Col xs={24} sm={12}>
          <DashboardChart />
        </Col>
      </Row>
    </Space>
  );
}

function DashboardCard({ title, value, icon, approvedOrders, pendingOrders, quantityProducts}) {
  const { Text } = Typography;
  return (
    <Card style={{ height: "100%", display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
      <Row align="middle" style={{height: "100%"}}>
        <Col flex="0 0 auto" style={{ display: 'flex', alignItems: 'center', marginRight: 16 }}>
          {icon}
        </Col>
        <Col flex="1 1 auto">
          <Space direction="vertical">
            <Text strong>{title}</Text>
            <Text style={{ fontSize: '1.5em' }}>{value}</Text>
            {approvedOrders && (
              <Space>
                <CheckCircleOutlined style={{ color: 'green' }} />
                <Text>Đơn hàng đã xử lý: {approvedOrders}</Text>
              </Space>
            )}
            {pendingOrders && (
              <Space>
                <ClockCircleOutlined style={{ color: 'orange' }} />
                <Text>Đơn hàng chờ xử lý: {pendingOrders}</Text>
              </Space>
            )}
            {quantityProducts && (
<Space>
                <CheckCircleOutlined style={{ color: 'green' }} />
                <Text>Đã bán: {quantityProducts}</Text>
              </Space>
            )}
          </Space>
        </Col>
      </Row>
    </Card>
  );
}
function RecentOrders() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   getOrders().then((res) => {
  //     setDataSource(res.products.splice(0, 3));
  //     setLoading(false);
  //   });
  // }, []);

  return (
    <>
      <Typography.Text>Recent Orders</Typography.Text>
      <Table
        columns={[
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
          },
          {
            title: "Price",
            dataIndex: "discountedPrice",
          },
        ]}
        loading={loading}
        dataSource={dataSource}
        pagination={false}
      ></Table>
    </>
  );
}
function DashboardChart() {
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  useEffect(() => {
    // Xử lý dữ liệu để tính doanh thu theo tháng
    const calculateMonthlyRevenue = async () => {
      const sampleData = await getAllOrder();
      const monthlyRevenueMap = {};
      sampleData.forEach(order => {
        const date = new Date(order.orderDate);
        const month = `${date.getMonth() + 1}/${date.getFullYear()}`;
        if (!monthlyRevenueMap[month]) {
          monthlyRevenueMap[month] = 0;
        }
        monthlyRevenueMap[month] += order.totalMoney;
      });
      const monthlyRevenueArray = Object.entries(monthlyRevenueMap).map(([key, value]) => ({
        month: key,
        revenue: value
      }));
      setMonthlyRevenue(monthlyRevenueArray);
    };

    calculateMonthlyRevenue();
  }, []);

  useEffect(() => {
    if (monthlyRevenue.length > 0) {
      const ctx = document.getElementById('monthlyRevenueChart');

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: monthlyRevenue.map(entry => entry.month),
          datasets: [{
            label: 'Doanh thu theo tháng',
            data: monthlyRevenue.map(entry => entry.revenue),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [monthlyRevenue]);

  return (
    <Card>
      <canvas id="monthlyRevenueChart" width={400} height={300}></canvas>
    </Card>
  );
}
export default Dashboard;