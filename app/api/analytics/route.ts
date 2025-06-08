import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { NextResponse } from 'next/server';
import { GoogleAuth } from 'google-auth-library';

// Tạo hàm để lấy Google Analytics data
async function getAnalyticsData() {
  try {
    // Trực tiếp sử dụng giá trị 483221586 thay vì đọc từ biến môi trường
    const propertyId = '483221586'; // GA4 Property ID
    console.log("Sử dụng Property ID:", propertyId);
    
    // Tạo Authentication client trực tiếp từ thông tin Service Account
    const auth = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
      projectId: 'ar-app-981f1',
      credentials: {
        client_email: 'blog-905@ar-app-981f1.iam.gserviceaccount.com',
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQChRrsAcqx4z8Wl\nV98XYYG6KUeloN5OrRL5o4rpRlJ+SUadXKX2xeEmKpX4D60JiwasT1oRU2AMliQg\n2lZfP01VDMzUszZshma8NPP5f8Gc1X9+TiI7QoeZ3W/bYjkdVSWa7+/vMJ90ZxO6\n0ATMZl1mdePH6SVQa5oy2bDysEXRSRJxa/nz4jRnbXRaHuqAapEm3JnATFWivC6e\nmnHHinUpbUXwAOJ4DHQjefpE9p3rxswDXGJbxQ22A1YzqgvJUo9BYpmq2v+uB5GW\nfGS4VhZLlein41LD4kESlWdxaS/MSp8vjWaVp60JkwDEgCPTFUtEeNpDpzta3W0+\nM88XbG8nAgMBAAECggEASauWpqi7cmBux42xQevvp4tNyDII+uWConh7bv4JltiA\nIkf9JBHWPGn9oZf/kjlorfN9kCaG3JkFHeC+zbmL6Mr1EkBfHwnyCg0iWZlrZun7\n2EV2y50jdjy56PwgXO7VQ8ZQ0vFiFXk0gQSe/IPSLIizqVEuE2Njx9C7TNEKw4Ok\nQqUeXjOBmw1xbNyADsiZrJg1eiD4AYaijBq6XuFI182abMVim+utl+9OxiICljf6\nLiMjsVZPmjekaJCh55cbL7/oqDltvHv1sjiPlWQuS1fhsC34baiLCu/nFrV2L2BO\nRtxNqD5+ASn9IPbyRrAHT6sO9q9a3sohpDHPkzJMsQKBgQDeHPTqgFpVVxEGNZzs\nbQ8iHo9/0l9Ygbo4Vgh8e0l83YbNZk6VTmSGN0+dkcy9tMxZoMc4x2pU8b/e3Sn7\n4KaitmlWpVe8VCOwIcvoJz5Kc9CqLzjEGiuKOc5d5HmjaJU34rg1WHpq221QI0OW\nhW6J+cUtfgh37EJeDeyeX2YoDwKBgQC54a2ILyoMWMXhdEQtB0Bfnw+6YggG3Vgo\njwn65M2fuLHNLxSATi0Tv4mBmnyElfGyCAfCfVfDdbWT6h7uvIv8oQsy7UcUVj3J\nlD3QwS/7ZGC7XMiMzUu/quipJ7fLfahXEX+8H9YGUMwPtkfWbbUjaXL6ndY7Gyu1\nk6p21uDvaQKBgQCRx6Of/hpMBNcxoiKasoHKPRCmLmdR6eNVcnIjca+r+qGtUkal\njExCIy9oFfexU2cENJhNVeUeV4U9Ox+BJ9N23A6LRf4tp3O8+JGij488woLkEBZL\n73lAQeyGh5ymec/mXDHXIXlHhTlb7alAs9b3TC30S9I3E6QDo1P4JlkgVQKBgF78\ntkLLZz9b9fLaCSTBeeHjVJQ4GEX5wl0ni0AMwA8IwMNLdbyDNoHK9SennE3cmeAS\nPnTivICDnEBz+U6iRx7X5PMnUZVQ5M4n1NbigfSDPPNB3LInDrhpS+90/nUcR3QG\n2zF1S1d63myBB4DKGzB3aGwtUBZwMgvd49RKxjNRAoGAccikzPCwbmpNS5d9EPgE\nN/GlmTW1Oah65r6wxkz9dUpo2T0+NacteZqyXV6OUJSWOeAdtS9CqhugAcQwoCpe\nEBTm59MCJbtpn9gQ/tp7Yr/wLiID76rPVjRU/CMLlCsW0VcuPFerapM2P+mHsC1x\nM2ljBytnx5rqY+TOXhtlJds=\n-----END PRIVATE KEY-----\n",
      },
    });

    // Khởi tạo Analytics Data client với auth đã tạo
    const analyticsDataClient = new BetaAnalyticsDataClient({
      auth,
    });
    
    // Ví dụ truy vấn số lượng người truy cập trong 30 ngày qua
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '30daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'date',
        },
      ],
      metrics: [
        {
          name: 'activeUsers',
        },
        {
          name: 'screenPageViews',
        },
      ],
    });

    // Xử lý dữ liệu trả về
    const result = {
      dates: [] as string[],
      activeUsers: [] as number[],
      pageViews: [] as number[]
    };
    
    response.rows?.forEach(row => {
      result.dates.push(row.dimensionValues?.[0].value || '');
      result.activeUsers.push(parseInt(row.metricValues?.[0].value || '0'));
      result.pageViews.push(parseInt(row.metricValues?.[1].value || '0'));
    });
    
    return result;
  } catch (error) {
    // Log lỗi chi tiết hơn
    console.error('Lỗi chi tiết:', error);
    throw error;
  }
}

// API endpoint để lấy dữ liệu tổng quan
export async function GET() {
  try {
    const data = await getAnalyticsData();
    return NextResponse.json(data);
  } catch (error) {
    // Trả về chi tiết lỗi thay vì thông báo chung
    return NextResponse.json(
      { error: `Chi tiết lỗi: ${error instanceof Error ? error.message : 'Lỗi không xác định'}` },
      { status: 500 }
    );
  }
} 