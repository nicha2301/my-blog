import { NextResponse } from 'next/server';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { GoogleAuth } from 'google-auth-library';

// 获取用户活动数据的函数
async function getUserActivityData(days: number = 30) {
  try {
    const propertyId = '483221586';
    console.log("Sử dụng Property ID:", propertyId);
    
    // 创建Auth客户端
    const auth = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
      projectId: 'ar-app-981f1',
      credentials: {
        client_email: 'blog-905@ar-app-981f1.iam.gserviceaccount.com',
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQChRrsAcqx4z8Wl\nV98XYYG6KUeloN5OrRL5o4rpRlJ+SUadXKX2xeEmKpX4D60JiwasT1oRU2AMliQg\n2lZfP01VDMzUszZshma8NPP5f8Gc1X9+TiI7QoeZ3W/bYjkdVSWa7+/vMJ90ZxO6\n0ATMZl1mdePH6SVQa5oy2bDysEXRSRJxa/nz4jRnbXRaHuqAapEm3JnATFWivC6e\nmnHHinUpbUXwAOJ4DHQjefpE9p3rxswDXGJbxQ22A1YzqgvJUo9BYpmq2v+uB5GW\nfGS4VhZLlein41LD4kESlWdxaS/MSp8vjWaVp60JkwDEgCPTFUtEeNpDpzta3W0+\nM88XbG8nAgMBAAECggEASauWpqi7cmBux42xQevvp4tNyDII+uWConh7bv4JltiA\nIkf9JBHWPGn9oZf/kjlorfN9kCaG3JkFHeC+zbmL6Mr1EkBfHwnyCg0iWZlrZun7\n2EV2y50jdjy56PwgXO7VQ8ZQ0vFiFXk0gQSe/IPSLIizqVEuE2Njx9C7TNEKw4Ok\nQqUeXjOBmw1xbNyADsiZrJg1eiD4AYaijBq6XuFI182abMVim+utl+9OxiICljf6\nLiMjsVZPmjekaJCh55cbL7/oqDltvHv1sjiPlWQuS1fhsC34baiLCu/nFrV2L2BO\nRtxNqD5+ASn9IPbyRrAHT6sO9q9a3sohpDHPkzJMsQKBgQDeHPTqgFpVVxEGNZzs\nbQ8iHo9/0l9Ygbo4Vgh8e0l83YbNZk6VTmSGN0+dkcy9tMxZoMc4x2pU8b/e3Sn7\n4KaitmlWpVe8VCOwIcvoJz5Kc9CqLzjEGiuKOc5d5HmjaJU34rg1WHpq221QI0OW\nhW6J+cUtfgh37EJeDeyeX2YoDwKBgQC54a2ILyoMWMXhdEQtB0Bfnw+6YggG3Vgo\njwn65M2fuLHNLxSATi0Tv4mBmnyElfGyCAfCfVfDdbWT6h7uvIv8oQsy7UcUVj3J\nlD3QwS/7ZGC7XMiMzUu/quipJ7fLfahXEX+8H9YGUMwPtkfWbbUjaXL6ndY7Gyu1\nk6p21uDvaQKBgQCRx6Of/hpMBNcxoiKasoHKPRCmLmdR6eNVcnIjca+r+qGtUkal\njExCIy9oFfexU2cENJhNVeUeV4U9Ox+BJ9N23A6LRf4tp3O8+JGij488woLkEBZL\n73lAQeyGh5ymec/mXDHXIXlHhTlb7alAs9b3TC30S9I3E6QDo1P4JlkgVQKBgF78\ntkLLZz9b9fLaCSTBeeHjVJQ4GEX5wl0ni0AMwA8IwMNLdbyDNoHK9SennE3cmeAS\nPnTivICDnEBz+U6iRx7X5PMnUZVQ5M4n1NbigfSDPPNB3LInDrhpS+90/nUcR3QG\n2zF1S1d63myBB4DKGzB3aGwtUBZwMgvd49RKxjNRAoGAccikzPCwbmpNS5d9EPgE\nN/GlmTW1Oah65r6wxkz9dUpo2T0+NacteZqyXV6OUJSWOeAdtS9CqhugAcQwoCpe\nEBTm59MCJbtpn9gQ/tp7Yr/wLiID76rPVjRU/CMLlCsW0VcuPFerapM2P+mHsC1x\nM2ljBytnx5rqY+TOXhtlJds=\n-----END PRIVATE KEY-----\n",
      },
    });

    // 创建Analytics Data客户端
    const analyticsDataClient = new BetaAnalyticsDataClient({
      auth,
    });

    // 获取用户活动数据
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: `${days}daysAgo`,
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'date',
        },
        {
          name: 'hour',
        },
      ],
      metrics: [
        {
          name: 'activeUsers',
        },
      ],
    });

    // 处理数据
    const activityData: {
      date: string;
      hour: string;
      users: number;
    }[] = [];

    response.rows?.forEach(row => {
      const date = row.dimensionValues?.[0].value || '';
      const hour = row.dimensionValues?.[1].value || '';
      const users = parseInt(row.metricValues?.[0].value || '0', 10);
      
      activityData.push({
        date,
        hour,
        users,
      });
    });

    // 按时间段聚合数据
    const aggregatedData = new Array(24).fill(0).map((_, i) => {
      const hour = i.toString().padStart(2, '0');
      const usersInHour = activityData
        .filter(item => item.hour === hour)
        .reduce((sum, item) => sum + item.users, 0);
      
      return {
        hour,
        users: usersInHour,
      };
    });

    return {
      activityData: aggregatedData,
      totalDays: days,
      totalUsers: aggregatedData.reduce((sum, item) => sum + item.users, 0)
    };
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu hoạt động người dùng:', error);
    throw error;
  }
}

export async function GET(request: Request) {
  try {
    // 从URL获取天数参数
    const url = new URL(request.url);
    const days = parseInt(url.searchParams.get('days') || '30', 10);
    
    // 验证天数是否有效
    const validDays = [7, 30, 90];
    const daysToUse = validDays.includes(days) ? days : 30;
    
    const data = await getUserActivityData(daysToUse);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: `Chi tiết lỗi: ${error instanceof Error ? error.message : 'Lỗi không xác định'}` },
      { status: 500 }
    );
  }
} 