import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, email, name, subject, message } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Log the data (Server-side logging)
    console.log('--- NEW SUBMISSION ---');
    console.log('Type:', type);
    console.log('Email:', email);
    if (name) console.log('Name:', name);
    if (subject) console.log('Subject:', subject);
    if (message) console.log('Message:', message);
    console.log('----------------------');

    // TODO: Integrate with an email service provider here.
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'onboarding@resend.dev',
    //   to: 'your-email@example.com',
    //   subject: subject || `New ${type} Submission`,
    //   html: `<p>Email: ${email}</p><p>Message: ${message}</p>`
    // });

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json(
      { message: 'Submission received successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
